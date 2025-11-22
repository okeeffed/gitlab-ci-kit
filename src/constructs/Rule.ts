import type {
  Rule as IRule,
} from "#schema/index.ts";

/**
 * Represents a rule for conditional job execution.
 * Can be an object, string, or array of strings.
 */
export class Rule {
  constructor(props: IRule) {
    Object.assign(this, props)
  }
}

export interface Rule extends IRule { }
