import { Injectable } from '@nestjs/common';

import { FilesStoreService } from './filesStore/filesStore.service';

@Injectable()
export class StoreService {
  save(filePath: string, workspaceData: object, userId: string) {
    const storeService = this.getStoreService(userId);
    storeService.saveByPath(filePath, workspaceData);
  }

  read(filePath: string, userId: string) {
    const storeService = this.getStoreService(userId);
    return storeService.get(filePath);
  }

  delete(filePath: string, userId: string) {
    const storeService = this.getStoreService(userId);
    return storeService.delete(filePath);
  }

  private getStoreService(userId: string) {
    return new FilesStoreService(userId);
  }
}
