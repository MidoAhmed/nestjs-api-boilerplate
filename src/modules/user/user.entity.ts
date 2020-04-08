import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from '../task/task.entity';

/* export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = 'USER',
  GHOST = "GHOST",
  GUEST = "GUEST"
} */

@Entity({ name: 'user' })
@Unique(['username'])
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({ nullable: false })
  password: string;
  
  @Column()
  salt: string;

  @Column({default: '', nullable: true})
  phone?: string;

  @OneToMany(type => Task, task => task.user, { eager: true, cascade: true})
  tasks: Task[];

/*   @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole */
  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
