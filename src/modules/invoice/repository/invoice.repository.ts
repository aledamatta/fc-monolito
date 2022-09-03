import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address";
import Invoice from "../domain/invoice";
import Product from "../domain/product";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceAddressModel from "./invoice.address.model";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";

export default class InvoiceRepostiory implements InvoiceGateway {

    async generate(input: Invoice): Promise<Invoice>{
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            address: {
                street: input.address.street,
                number: input.address.number,
                complement: input.address.complement,
                city: input.address.city,
                state: input.address.state,
                zipCode: input.address.zipCode,
            },
            items: input.items.map((p)=> {
                return {
                    id: p.id.id, 
                    name: p.name, 
                    price: p.price, 
                    createdAt: p.createdAt, 
                    updatedAt: p.updatedAt
                };
            }),
            createdAt: input.createdAt,
            updatedAt: input.updatedAt           
        },{
            include: [InvoiceAddressModel,InvoiceProductModel]
        });

        return new Invoice({
            id: input.id,
            name: input.name,
            document: input.document,
            address: input.address,
            items: input.items,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt   
        });
    }

    async find(id: string): Promise<Invoice>{
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: [InvoiceAddressModel, InvoiceProductModel]
        });
    
        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`);
        }
    
        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            }),
            items: invoice.items.map((p) => new Product({
                id: new Id(p.id), 
                name: p.name, 
                price: p.price, 
                createdAt: p.createdAt, 
                updatedAt: p.updatedAt
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt  
        });
    }
}