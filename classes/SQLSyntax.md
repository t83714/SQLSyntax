[sql-syntax](../README.md) / [Exports](../modules.md) / SQLSyntax

# Class: SQLSyntax

An class represents a SQL query piece / fragment.
The provided `sqls` tagged template literals will output an instance of SQLSyntax class.
All properties of SQLSyntax are readonly. Thus is immutable.
An instance of SQLSyntax class will record

## Table of contents

### Constructors

- [constructor](SQLSyntax.md#constructor)

### Properties

- [isEmpty](SQLSyntax.md#isempty)
- [rawSqlParts](SQLSyntax.md#rawsqlparts)
- [rawValues](SQLSyntax.md#rawvalues)
- [sqlParts](SQLSyntax.md#sqlparts)
- [values](SQLSyntax.md#values)
- [asc](SQLSyntax.md#asc)
- [desc](SQLSyntax.md#desc)
- [empty](SQLSyntax.md#empty)

### Methods

- [and](SQLSyntax.md#and)
- [append](SQLSyntax.md#append)
- [asc](SQLSyntax.md#asc)
- [desc](SQLSyntax.md#desc)
- [eq](SQLSyntax.md#eq)
- [exists](SQLSyntax.md#exists)
- [ge](SQLSyntax.md#ge)
- [groupBy](SQLSyntax.md#groupby)
- [gt](SQLSyntax.md#gt)
- [having](SQLSyntax.md#having)
- [in](SQLSyntax.md#in)
- [isNotNull](SQLSyntax.md#isnotnull)
- [isNull](SQLSyntax.md#isnull)
- [le](SQLSyntax.md#le)
- [like](SQLSyntax.md#like)
- [limit](SQLSyntax.md#limit)
- [lt](SQLSyntax.md#lt)
- [notExists](SQLSyntax.md#notexists)
- [notIn](SQLSyntax.md#notin)
- [notLike](SQLSyntax.md#notlike)
- [offset](SQLSyntax.md#offset)
- [or](SQLSyntax.md#or)
- [orderBy](SQLSyntax.md#orderby)
- [roundBracket](SQLSyntax.md#roundbracket)
- [toQuery](SQLSyntax.md#toquery)
- [where](SQLSyntax.md#where)
- [avg](SQLSyntax.md#avg)
- [count](SQLSyntax.md#count)
- [createUnsafely](SQLSyntax.md#createunsafely)
- [csv](SQLSyntax.md#csv)
- [distinct](SQLSyntax.md#distinct)
- [eq](SQLSyntax.md#eq)
- [exists](SQLSyntax.md#exists)
- [filterEmpty](SQLSyntax.md#filterempty)
- [ge](SQLSyntax.md#ge)
- [groupBy](SQLSyntax.md#groupby)
- [gt](SQLSyntax.md#gt)
- [hasAndOr](SQLSyntax.md#hasandor)
- [having](SQLSyntax.md#having)
- [in](SQLSyntax.md#in)
- [isNotNull](SQLSyntax.md#isnotnull)
- [isNull](SQLSyntax.md#isnull)
- [join](SQLSyntax.md#join)
- [joinWithAnd](SQLSyntax.md#joinwithand)
- [joinWithOr](SQLSyntax.md#joinwithor)
- [le](SQLSyntax.md#le)
- [like](SQLSyntax.md#like)
- [limit](SQLSyntax.md#limit)
- [lt](SQLSyntax.md#lt)
- [max](SQLSyntax.md#max)
- [min](SQLSyntax.md#min)
- [notExists](SQLSyntax.md#notexists)
- [notIn](SQLSyntax.md#notin)
- [notLike](SQLSyntax.md#notlike)
- [offset](SQLSyntax.md#offset)
- [orderBy](SQLSyntax.md#orderby)
- [roundBracket](SQLSyntax.md#roundbracket)
- [sum](SQLSyntax.md#sum)
- [where](SQLSyntax.md#where)

## Constructors

### constructor

• **new SQLSyntax**(`isEmpty`, `rawSqlParts?`, `rawValues?`, `sqlParts?`, `values?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEmpty` | `boolean` |
| `rawSqlParts?` | `TemplateStringsArray` |
| `rawValues?` | [`RawValue`](../modules.md#rawvalue)[] |
| `sqlParts?` | `string`[] |
| `values?` | [`Value`](../modules.md#value)[] |

#### Defined in

[index.ts:31](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L31)

## Properties

### isEmpty

• `Readonly` **isEmpty**: `boolean`

#### Defined in

[index.ts:26](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L26)

___

### rawSqlParts

• `Private` `Optional` `Readonly` **rawSqlParts**: `TemplateStringsArray`

#### Defined in

[index.ts:22](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L22)

___

### rawValues

• `Private` `Optional` `Readonly` **rawValues**: [`RawValue`](../modules.md#rawvalue)[]

#### Defined in

[index.ts:23](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L23)

___

### sqlParts

• `Readonly` **sqlParts**: `string`[] = `[]`

#### Defined in

[index.ts:29](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L29)

___

### values

• `Readonly` **values**: [`Value`](../modules.md#value)[] = `[]`

#### Defined in

[index.ts:28](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L28)

___

### asc

▪ `Static` **asc**: [`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:388](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L388)

___

### desc

▪ `Static` **desc**: [`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:389](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L389)

___

### empty

▪ `Static` **empty**: [`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:286](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L286)

## Methods

### and

▸ **and**(`condition?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:171](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L171)

___

### append

▸ **append**(`syntax`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `syntax` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:122](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L122)

___

### asc

▸ **asc**(): [`SQLSyntax`](SQLSyntax.md)

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:148](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L148)

___

### desc

▸ **desc**(): [`SQLSyntax`](SQLSyntax.md)

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:152](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L152)

___

### eq

▸ **eq**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:192](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L192)

___

### exists

▸ **exists**(`part?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `part?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:272](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L272)

___

### ge

▸ **ge**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:204](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L204)

___

### groupBy

▸ **groupBy**(...`columns`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...columns` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:126](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L126)

___

### gt

▸ **gt**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:200](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L200)

___

### having

▸ **having**(`condition`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:135](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L135)

___

### in

▸ **in**(`values`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | [`Value`](../modules.md#value)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:224](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L224)

▸ **in**(`subQuery`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `subQuery` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:225](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L225)

___

### isNotNull

▸ **isNotNull**(): [`SQLSyntax`](SQLSyntax.md)

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:220](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L220)

___

### isNull

▸ **isNull**(): [`SQLSyntax`](SQLSyntax.md)

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:216](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L216)

___

### le

▸ **le**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:212](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L212)

___

### like

▸ **like**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `String` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:264](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L264)

___

### limit

▸ **limit**(`n`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:156](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L156)

___

### lt

▸ **lt**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:208](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L208)

___

### notExists

▸ **notExists**(`part`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `part` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:279](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L279)

___

### notIn

▸ **notIn**(`values`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | [`Value`](../modules.md#value)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:244](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L244)

▸ **notIn**(`subQuery`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `subQuery` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:245](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L245)

___

### notLike

▸ **notLike**(`value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `String` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:268](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L268)

___

### offset

▸ **offset**(`n`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:160](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L160)

___

### or

▸ **or**(`condition?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:178](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L178)

___

### orderBy

▸ **orderBy**(...`columns`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...columns` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:139](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L139)

___

### roundBracket

▸ **roundBracket**(): [`SQLSyntax`](SQLSyntax.md)

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:185](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L185)

___

### toQuery

▸ **toQuery**(): [`string`, [`Value`](../modules.md#value)[]]

#### Returns

[`string`, [`Value`](../modules.md#value)[]]

#### Defined in

[index.ts:105](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L105)

___

### where

▸ **where**(`conditions?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:164](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L164)

___

### avg

▸ `Static` **avg**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:513](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L513)

___

### count

▸ `Static` **count**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:501](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L501)

___

### createUnsafely

▸ `Static` **createUnsafely**(`sqlStr`, `params?`): [`SQLSyntax`](SQLSyntax.md)

Allow create an instance of SQLSyntax from a string variable `sqlStr`.
The content of the string variable `sqlStr` will become the SQL query string without any escaping.
You might need this method to create indentifier (e.g. tbale or column names) as SQLSyntax.
Make sure you process the string input well to avoid SQL injection vulnerability.

**`static`**

**`memberof`** SQLSyntax

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sqlStr` | `string` | `undefined` |
| `params` | `any`[] | `[]` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:300](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L300)

___

### csv

▸ `Static` **csv**(...`parts`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...parts` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:330](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L330)

___

### distinct

▸ `Static` **distinct**(...`columns`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...columns` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:497](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L497)

___

### eq

▸ `Static` **eq**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:403](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L403)

___

### exists

▸ `Static` **exists**(`part`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `part` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:489](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L489)

___

### filterEmpty

▸ `Static` **filterEmpty**(`parts`): [`SQLSyntax`](SQLSyntax.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)[]

#### Defined in

[index.ts:304](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L304)

___

### ge

▸ `Static` **ge**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:415](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L415)

___

### groupBy

▸ `Static` **groupBy**(...`columns`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...columns` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:376](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L376)

___

### gt

▸ `Static` **gt**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:411](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L411)

___

### hasAndOr

▸ `Static` **hasAndOr**(`s`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

`boolean`

#### Defined in

[index.ts:338](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L338)

___

### having

▸ `Static` **having**(`condition`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:380](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L380)

___

### in

▸ `Static` **in**(`column`, `values`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `values` | [`Value`](../modules.md#value)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:435](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L435)

▸ `Static` **in**(`column`, `subQuery`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `subQuery` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:436](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L436)

___

### isNotNull

▸ `Static` **isNotNull**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:431](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L431)

___

### isNull

▸ `Static` **isNull**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:427](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L427)

___

### join

▸ `Static` **join**(`parts`, `delimiter`, `spaceBeforeDelimier?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `parts` | [`SQLSyntax`](SQLSyntax.md)[] | `undefined` |
| `delimiter` | [`SQLSyntax`](SQLSyntax.md) | `undefined` |
| `spaceBeforeDelimier` | `boolean` | `true` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:311](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L311)

___

### joinWithAnd

▸ `Static` **joinWithAnd**(`conditions`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:348](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L348)

___

### joinWithOr

▸ `Static` **joinWithOr**(`conditions`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditions` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:362](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L362)

___

### le

▸ `Static` **le**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:423](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L423)

___

### like

▸ `Static` **like**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | `String` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:481](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L481)

___

### limit

▸ `Static` **limit**(`n`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:391](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L391)

___

### lt

▸ `Static` **lt**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | [`Value`](../modules.md#value) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:419](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L419)

___

### max

▸ `Static` **max**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:509](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L509)

___

### min

▸ `Static` **min**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:505](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L505)

___

### notExists

▸ `Static` **notExists**(`part`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `part` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:493](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L493)

___

### notIn

▸ `Static` **notIn**(`column`, `values`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `values` | [`Value`](../modules.md#value)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:458](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L458)

▸ `Static` **notIn**(`column`, `subQuery`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `subQuery` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:459](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L459)

___

### notLike

▸ `Static` **notLike**(`column`, `value`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |
| `value` | `String` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:485](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L485)

___

### offset

▸ `Static` **offset**(`n`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:395](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L395)

___

### orderBy

▸ `Static` **orderBy**(...`columns`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...columns` | [`SQLSyntax`](SQLSyntax.md)[] |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:384](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L384)

___

### roundBracket

▸ `Static` **roundBracket**(`inner?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `inner?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:521](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L521)

___

### sum

▸ `Static` **sum**(`column`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:517](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L517)

___

### where

▸ `Static` **where**(`condition?`): [`SQLSyntax`](SQLSyntax.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition?` | [`SQLSyntax`](SQLSyntax.md) |

#### Returns

[`SQLSyntax`](SQLSyntax.md)

#### Defined in

[index.ts:399](https://github.com/t83714/SQLSyntax/blob/6e5a264/src/index.ts#L399)
