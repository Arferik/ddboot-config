# @nsboot/logger

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[npm-image]: https://img.shields.io/npm/v/@nsboot/log4js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@nsboot/log4js
[downloads-image]: https://img.shields.io/npm/dm/@nsboot/log4js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@nsboot/log4js

## Description

config module for [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm i --save @ddboot/config yaml lodash
```

## Quick Start

- import `ConfigModule` in your root module

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@ddboot/config';
@Module({
  imports: [
    ConfigModule.forRootAsync({
      filePath: '',
      fileName: 'config.yaml',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- use `LoggerService` in your service

```typescript
import { Injectable } from '@nestjs/common';
import { InjectConfig, ConfigService } from '@ddboot/config';

@Injectable()
export class AppService {
  //must use @InjectConfig() to inject logger
  constructor(@InjectConfig() private readonly config: ConfigService) {}
  getHello(): string {
    this.config.get('client.id');
    return 'Hello World!';
  }
}
```

- or use `@Value()` decorator in your service

```typescript
import { Injectable } from '@nestjs/common';
import { Value } from '@ddboot/config';

@Injectable()
export class AppService {
  @Value('client.id')
  private clientId: string;

  getHello(): string {
    this.logger.info('getHello');
    return 'Hello World!';
  }
}
```

> Note: `@Value()` decorator will inject `Logger` instance to your service, so you can use `this.logger` to log.
> If you want to use `@InjectLogger()` decorator, you must use `this.iLogger.getLogger()` to get `Logger` instance.

## Configuration

- `Config`

```typescript
interface Config {
  path?: string;
  level?: string;
  // file name
  name?: string;
  // console show log
  console?: boolean;
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

@nsboot/logger is [MIT licensed](LICENSE).
