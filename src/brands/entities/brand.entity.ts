import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {unique: true})
    name: string;

    @Column('varchar', {unique: true})
    slug: string;

    @BeforeInsert()
    checkSlug(): void {
        if (!this.slug)
            this.slug = this.name;
        this.slug = this.slug.toLowerCase().replaceAll(' ','_').replaceAll('"',"");
    }
}
