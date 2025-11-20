import type {
  Rule as IRule,
  If,
  Changes,
  Exists,
  RulesVariables,
  When,
  StartIn,
  AllowFailure,
  RulesNeeds,
  Interruptible,
} from "#schema/index.ts";

/**
 * Represents a rule for conditional job execution.
 * Can be an object, string, or array of strings.
 */
export class Rule implements IRule {
  if?: If;
  changes?: Changes;
  exists?: Exists;
  variables?: RulesVariables;
  when?: When;
  start_in?: StartIn;
  allow_failure?: AllowFailure;
  needs?: RulesNeeds;
  interruptible?: Interruptible;

  constructor(props: IRule) {
    this.if = props.if;
    this.changes = props.changes;
    this.exists = props.exists;
    this.variables = props.variables;
    this.when = props.when;
    this.start_in = props.start_in;
    this.allow_failure = props.allow_failure;
    this.needs = props.needs;
    this.interruptible = props.interruptible;
  }
}
