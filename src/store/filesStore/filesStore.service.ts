import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Class is working with filesystem in local machine
 * Solution for learning OF that's why it does not require any external Stores or DBs
 * Path to user files example "<root folder>/<store folder>/<user id>/<folder path>"
 */
export class FilesStoreService {
  constructor(private readonly userId: string) {}

  saveByPath<D extends object>(filePath: string, data: D) {
    const parsedPath = filePath.split('/');
    const fileName = this.getFileWithExt(parsedPath.pop());
    this.validateCreateBaseFolder(...parsedPath);
    const pathToSave = this.getFullPath(this.getPath(...parsedPath, fileName));
    this.saveFile(pathToSave, data);
  }

  get(discPath: string) {
    if (this.isPathToFile(discPath)) {
      return this.getFileByPath(discPath);
    }
    return this.getFilesInFolder(discPath) || [];
  }

  delete(discPath: string) {
    this.deleteFile(discPath);
  }

  private deleteFile(filePath) {
    const pathToRemove = this.getFullPath(this.getPath(filePath));
    this.validateFileFolderExists(pathToRemove);
    fs.rmSync(pathToRemove, { recursive: true, force: true });
  }

  private isPathToFile(filePath: string) {
    return filePath.endsWith('.json');
  }

  private validateCreateBaseFolder(...nestedFolders: string[]) {
    const pathsList = this.getPath(...nestedFolders)
      .split('/')
      .filter(Boolean);
    this.createBaseFolder(pathsList);
  }

  private createBaseFolder(pathsList: string[]) {
    const currentPath = [];
    do {
      currentPath.push(pathsList.shift());
      this.createFolderIfNotExist(this.getFullPath(currentPath.join('/')));
    } while (pathsList.length);
  }

  private getFileByPath(filePath: string) {
    const pathToSavedFile = this.getFullPath(this.getPath(filePath));
    this.validateFileFolderExists(pathToSavedFile);
    return this.getFileContentByPath(pathToSavedFile);
  }

  private getFilesInFolder(folderPath: string) {
    const fullFolderPath = this.getFullPath(this.getPath(folderPath));
    this.validateFileFolderExists(fullFolderPath);
    const filesInFolder = this.getFilesNamesInFolder(fullFolderPath);
    const filesWithStats = this.getFilesStats(fullFolderPath, filesInFolder);
    const filteredFiles = this.filterFileJSONs(filesWithStats);
    return filteredFiles.map(this.formatFileInfo);
  }

  private formatFileInfo(file) {
    const [fileName, stat] = file;
    return {
      name: fileName.replace(/\.json$/, ''),
      updatedAt: stat.mtime,
    };
  }

  private getFilesNamesInFolder(folderPath: string) {
    return fs.readdirSync(folderPath);
  }

  private getFilesStats(
    folderPath: string,
    filesInFolder: string[],
  ): [string, fs.Stats][] {
    return filesInFolder.map((fileName) => [
      fileName,
      fs.statSync(path.join(folderPath, fileName)),
    ]);
  }

  private filterFileJSONs(files: [string, fs.Stats][]) {
    return files.filter(
      ([fileName, stat]) => this.isPathToFile(fileName) && stat.isFile(),
    );
  }

  private createFolderIfNotExist(pathToFolder: string) {
    if (this.isNotExist(pathToFolder)) {
      this.createFolder(pathToFolder);
    }
  }

  private saveFile<D extends object>(filePath: string, data: D) {
    fs.writeFileSync(filePath, this.stringifyFileData(data), {
      encoding: 'utf8',
    });
  }

  private isNotExist(fileFolderPath: string) {
    return !this.isExist(fileFolderPath);
  }

  private isExist(fileFolderPath: string) {
    return fs.existsSync(fileFolderPath);
  }

  private createFolder(pathToFolder: string) {
    fs.mkdirSync(pathToFolder);
  }

  private getRootPath() {
    return process.cwd();
  }

  private getFullPath(...folders: string[]) {
    return path.join(this.getRootPath(), ...folders);
  }

  private getPath(...nestedFolders: string[]) {
    return [process.env.STORE_FILES_PATH, this.userId, ...nestedFolders].join(
      '/',
    );
  }

  private getFileWithExt(name: string) {
    return `${name}.json`;
  }

  private getFileContentByPath(path: string) {
    const contentStr = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(contentStr);
  }

  private stringifyFileData<T extends object>(data: T) {
    return JSON.stringify(data, null, 2);
  }

  private validateFileFolderExists(pathTo: string) {
    if (this.isNotExist(pathTo)) {
      this.throwNotFoundError();
    }
  }

  private throwNotFoundError() {
    throw new NotFoundException();
  }
}
