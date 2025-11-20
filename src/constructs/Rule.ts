import type { CamelCasedPropertiesDeep } from 'type-fest';
import type { Rules } from '../schema/index.js';

/**
 * Extract the union of valid rule items from Rules type.
 * Rules can be: object | string | string[]
 */
type RuleItem = NonNullable<Rules> extends (infer U)[] ? U : never;

/**
 * Rule configuration with camelCase property names.
 */
export type RuleProps = RuleItem extends object
  ? CamelCasedPropertiesDeep<RuleItem> | string | [string, ...string[]]
  : RuleItem;

/**
 * Represents a rule for conditional job execution.
 * Can be an object, string, or array of strings.
 */
export class Rule {
  constructor(public readonly props: RuleProps) { }
}
