import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPass(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      //If already exists this username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Mix Password and Hash
   * @param password Password of user.
   * @param salt salt key.
   * @returns return the hash mixed
   */

  private async hashPass(password, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
