import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_product",
    timestamps: false,
})
export default class InvoiceProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
  
    @Column({ allowNull: false })
    name: string;
  
    @Column({ allowNull: false })
    price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, field: "invoice_id" })
    invoiceId: string;
  
    @Column({ allowNull: false, field: "created_at" })
    createdAt: Date;
  
    @Column({ allowNull: false, field: "updated_at" })
    updatedAt: Date;
}