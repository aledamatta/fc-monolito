import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/address";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface{

    constructor(private invoiceRepository: InvoiceGateway ){}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode
            }),
            items: input.items.map((p) => new Product({id: new Id(p.id), name: p.name, price: p.price}))
        });


        const iGenerated = await this.invoiceRepository.generate(invoice);
      
          return {
            id: iGenerated.id.id,
            name: iGenerated.name,
            document: iGenerated.document,
            street: iGenerated.address.street,
            number: iGenerated.address.number,
            complement: iGenerated.address.complement,
            city: iGenerated.address.city,
            state: iGenerated.address.state,
            zipCode: iGenerated.address.zipCode,
            total: iGenerated.total,
            items: iGenerated.items.map((p)=> {
                return {id: p.id.id, name: p.name, price: p.price};
            })           
          };
    }

}