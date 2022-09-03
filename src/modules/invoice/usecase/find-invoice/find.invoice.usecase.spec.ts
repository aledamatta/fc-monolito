import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import FindInvoiceUseCase from "./find.invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
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

const MockRepository = () => {
    return {
      generate: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);
        const input = {
            id: "1",
        }   

        const result = await usecase.execute(input);
  
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.total).toBe(300);
        expect(result.createAt).toBe(invoice.createdAt);

        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
    });
});