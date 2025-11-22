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

  /**
   * Return immutable rule that is required
   * to be triggered manually. 
   *
   * @note Does not mutate the original instance.
   */
  manual(): Rule {
    return {
      ...this,
      when: 'manual'
    }
  }
}

export interface Rule extends IRule { }
