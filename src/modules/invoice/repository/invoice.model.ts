import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceAddressModel from "./invoice.address.model";
import InvoiceProductModel from "./invoice.product.model";

@Table({
    tableName: "invoice",
    timestamps: false,
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @HasOne(() => InvoiceAddressModel,'invoiceId')
    address: InvoiceAddressModel;

    @HasMany(() => InvoiceProductModel,'invoiceId')
    items: InvoiceProductModel[]

    @Column({ allowNull: false, field: "created_at" })
    createdAt: Date;
  
    @Column({ allowNull: false, field: "updated_at" })
    updatedAt: Date;
}