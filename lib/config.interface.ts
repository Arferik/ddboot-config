export interface ConfigOption {
  filePath?: string;
  fileName?: string;
}

export interface AppConfig {
  name: string;
  version: string;
  port: number;
}

export interface ConfigDecoratorOptions {
  configKey: string;
  defaultKey: string;
}
