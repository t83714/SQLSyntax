[sql-syntax](README.md) / Exports

# sql-syntax

## Table of contents

### References

- [default](modules.md#default)

### Classes

- [SQLSyntax](classes/SQLSyntax.md)

### Type aliases

- [RawValue](modules.md#rawvalue)
- [Value](modules.md#value)

### Functions

- [sqls](modules.md#sqls)

## References

### default

Renames and re-exports [SQLSyntax](classes/SQLSyntax.md)

## Type aliases

### RawValue

Ƭ **RawValue**: [`Value`](modules.md#value) \| [`SQLSyntax`](classes/SQLSyntax.md)

#### Defined in

[index.ts:11](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L11)

___

### Value

Ƭ **Value**: `string` \| `number` \| `boolean` \| `Date` \| ``null`` \| `undefined` \| [`Value`](modules.md#value)[] \| { [key: string]: [`Value`](modules.md#value);  }

#### Defined in

[index.ts:1](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L1)

## Functions

### sqls

▸ `Const` **sqls**(`sqlParts`, ...`values`): [`SQLSyntax`](classes/SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sqlParts` | `TemplateStringsArray` |
| `...values` | `any`[] |

#### Returns

[`SQLSyntax`](classes/SQLSyntax.md)

#### Defined in

[index.ts:529](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L529)
