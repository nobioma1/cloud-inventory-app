import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProductsService } from '../products.service';

@Injectable()
export class IsProductGuard implements CanActivate {
  constructor(private readonly productsService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const workspaceId = request?.params?.workspaceId;
    const productId = request?.params?.productId;

    try {
      const product = await this.productsService.findOne(
        productId,
        workspaceId,
      );

      if (!product) {
        throw new Error('Product not found');
      }

      request['product'] = product;
    } catch {
      throw new NotFoundException();
    }

    return true;
  }
}
