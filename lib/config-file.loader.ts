import { Inject, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import { ConfigOption, AppConfig } from './config.interface';
import { CONFIG_NAME, CONFIG_OPTION } from './config.constant';

@Injectable()
export class ConfigFileLoader {
  private readonly logger = new Logger(ConfigFileLoader.name);

  constructor(
    @Inject(CONFIG_OPTION)
    private readonly configOption: ConfigOption,
  ) {}

  load() {
    let filePath = '';
    let fileName = '';
    if (!this.configOption) {
      filePath = '.';
      fileName = CONFIG_NAME;
      this.logger.warn(
        'the configOption is null, use default config file, the file name is ' +
          CONFIG_NAME,
      );
    } else {
      filePath = this.configOption.filePath;
      fileName = this.configOption.fileName;
      this.logger.log('use configOption to load config file');
    }

    if (!filePath || !fileName) {
      this.logger.error('filePath or fileName is null');
      throw new Error('filePath or fileName is null');
    }
    const configFileName = join(filePath, fileName);
    if (!existsSync(configFileName)) {
      //在 filePath 中未找到相应的文件
      throw new Error(`${fileName} file not found in ${filePath}`);
    }
    let configContent = '';
    try {
      configContent = readFileSync(configFileName, 'utf-8');
    } catch (error) {
      throw new Error(`file Path not found the error is` + error.toString());
    }
    let config: AppConfig;
    try {
      config = parse(configContent);
    } catch (error) {
      throw new Error(`file parse error, the error is` + error.toString());
    }

    return config;
  }
}
