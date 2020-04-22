import { BaseEntity, Entity, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';
import { AbstractEntity } from '../../commun/abstract.entity';
import { TaskEntity } from '../task/task.entity';


@Entity({ name: 'user' })
@Unique(['username'])
export class UserEntity extends AbstractEntity {

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({ nullable: false})
  password: string;
  
  @Column()
  salt: string;

  @Column({default: '', nullable: true})
  phone?: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true, cascade: true})
  tasks: TaskEntity[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole

  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
