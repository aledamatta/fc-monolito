import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address";
import Invoice from "../domain/invoice";
import Product from "../domain/product";
import InvoiceAddressModel from "./invoice.address.model";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";
import InvoiceRepostiory from "./invoice.repository";

describe("InvoiceRepository test", () => {
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
    })

    it("should generate a invoice", async () => {
        const invoice = new Invoice({
            name: "Invoice 1",
            document: "Document 1",
            address: new Address({
                street: "Street 1",
                number: "123",
                complement: "Compl 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1"
            }),
            items: [
                new Product({id: new Id("1"), name: "Product 1", price: 100.0}),
                new Product({id: new Id("2"), name: "Product 2", price: 200.0})
            ]
        });

        const repository = new InvoiceRepostiory();
        const result = await repository.generate(invoice);
    
        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.total).toBe(300);

        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);  
      });
      
      it("should find a invoice", async () => {
        const invoice = new Invoice({
            name: "Invoice 1",
            document: "Document 1",
            address: new Address({
                street: "Street 1",
                number: "123",
                complement: "Compl 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1"
            }),
            items: [
                new Product({id: new Id("1"), name: "Product 1", price: 100.0}),
                new Product({id: new Id("2"), name: "Product 2", price: 200.0})
            ]
        });

        const repository = new InvoiceRepostiory();
        await repository.generate(invoice);

        const result = await repository.find(invoice.id.id);
    
        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.total).toBe(300);

        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);  
      });    
     
});