import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "../../brands/entities/brand.entity";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ManyToOne(()=>Brand, (brand) => brand.cars,{eager: true})
    brand: string;
    
    @Column('varchar', {unique: true})
    model: string;

    @Column('int')
    year: number;
}