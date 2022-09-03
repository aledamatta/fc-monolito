import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceAddressModel from "../repository/invoice.address.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceProductModel from "../repository/invoice.product.model";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel, InvoiceAddressModel, InvoiceProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should generate a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Name 1",
            document: "Document 1",
            street: "Stree 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items:[
                {id: "1", name: "Product 1", price: 100.0} ,
                {id: "2", name: "Product 2", price: 200.0} 
           ] 
        };

        const result = await facade.generate(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.total).toBe(300);

        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);         
    });
    
    it("should find a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Name 1",
            document: "Document 1",
            street: "Stree 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items:[
                {id: "1", name: "Product 1", price: 100.0} ,
                {id: "2", name: "Product 2", price: 200.0} 
           ] 
        };

        await InvoiceModel.create({
            id: input.id,
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items.map((p)=> {
                return {
                    id: p.id, 
                    name: p.name, 
                    price: p.price, 
                    createdAt: new Date(), 
                    updatedAt: new Date()
                };
            }),
            createdAt: new Date(),
            updatedAt: new Date()           
        },{
            include: [InvoiceAddressModel,InvoiceProductModel]
        });

        const result = await facade.find({ id: "1" });  

        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.total).toBe(300);

        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);         
    });   
});