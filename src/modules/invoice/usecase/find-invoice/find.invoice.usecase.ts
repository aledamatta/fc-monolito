import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find.invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface{

    constructor(private invoiceRepository: InvoiceGateway ){}

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const invoice = await this.invoiceRepository.find(input.id);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            total: invoice.total,
            createAt: invoice.createdAt,
            items: invoice.items.map((p)=> {
                return {id: p.id.id, name: p.name, price: p.price};
            })               
        }
     }

}