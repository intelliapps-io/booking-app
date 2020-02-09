import { Column, ColumnOptions, BaseEntity, SelectQueryBuilder } from "typeorm";
import { exec } from "child_process";
import * as readline from 'readline'

// Query Helpers
export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}

export function joinRelation<T extends BaseEntity>(query: SelectQueryBuilder<T>, entityName: string, entityField: keyof T, alias?: string) {
  return query.leftJoinAndSelect(`${entityName}.${entityField}`, alias ? alias : entityField as string)
}

export function queryPaginatedResponse<T extends BaseEntity>(query: SelectQueryBuilder<T>): Promise<{ items: T[], total: number }> {
  return new Promise((resolve: (args: { items: T[], total: number }) => void, reject: (err: Error) => void) => {
    query.getManyAndCount().then(result => resolve({ items: result[0], total: result[1] })).catch((err: Error) => reject(err))
  })
}

export function toSqlArray(items: string[] | string) {
  if (typeof items === "string") items = [items];
  return items.map(item => `'${item}'`).toString()
}

export const nodeLogger = require('debug')('logger');

export const runCodegen = () => {
  return new Promise(async (reject, resolve) => {
    const generate = await exec("npm run gen");
    const start = new Date();
    let isError = false;
    if (generate.stdout) {
      const logInterval = setInterval(() => {
        const now = new Date();
        const duration = now.getTime() - start.getTime();
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
        if (!isError) process.stdout.write(`Codegen Running ... ${Math.round(duration / 1000)} seconds`)
      }, 500);
      generate.stdout.on('data', (data: string) => {
        if (data.indexOf("npm ERR!") > 0) isError = true;
        if (isError) process.stdout.write(data);
      })
      generate.stdout.on('end', () => {
        if (isError) {
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          process.stdout.write("`Codegen Failed, run 'npm run gen' for error details`")
          reject();
        } else {
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          process.stdout.write("Codegen Finished")
          resolve();
        }
        clearInterval(logInterval);
      })
    }
  });
}

export const isFormatYMD = (dateString: string): boolean => {
  const reg = RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).compile()
  return reg.test(dateString)
}