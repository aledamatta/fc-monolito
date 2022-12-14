import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_address",
    timestamps: false,
})
export default class InvoiceAddressModel extends Model {
    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, field: "invoice_id" })
    invoiceId: string;

    @Column({ allowNull: false })
    street: string;
 
    @Column({ allowNull: false })
    number: string;
 
    @Column({ allowNull: false })
    complement: string;
 
    @Column({ allowNull: false })
    city: string;
 
    @Column({ allowNull: false })
    state: string;
 
    @Column({ allowNull: false })
    zipCode: string;
 
}
