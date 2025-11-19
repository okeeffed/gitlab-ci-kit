/**
 * Base class for all constructs in the GitLab CI Kit library.
 * Follows the AWS CDK pattern for construct hierarchies.
 */
export abstract class Construct {
  /**
   * The construct tree node associated with this construct.
   */
  private readonly _children: Construct[] = [];

  /**
   * Creates a new construct.
   *
   * @param scope The scope in which this construct is defined (parent construct)
   * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
   */
  constructor(
    public readonly scope: Construct | null,
    public readonly id: string
  ) {
    if (scope) {
      scope._children.push(this);
    }
  }

  /**
   * Returns all child constructs.
   */
  get children(): ReadonlyArray<Construct> {
    return this._children;
  }

  /**
   * Returns the path of this construct in the tree.
   * The path is a string of IDs separated by '/'.
   */
  get path(): string {
    const segments: string[] = [];
    let current: Construct | null = this;

    while (current) {
      segments.unshift(current.id);
      current = current.scope;
    }

    return segments.join('/');
  }

  /**
   * Finds a child construct by ID.
   *
   * @param id The ID of the child to find
   * @returns The child construct, or undefined if not found
   */
  findChild(id: string): Construct | undefined {
    return this._children.find((child) => child.id === id);
  }

  /**
   * Returns all children of a specific type.
   *
   * @param type The constructor of the type to filter by
   * @returns Array of children of the specified type
   */
  findChildrenOfType<T extends Construct>(
    type: new (...args: any[]) => T
  ): T[] {
    return this._children.filter((child): child is T => child instanceof type);
  }

  /**
   * Called to validate the construct. Override this method to implement validation logic.
   * This method can be recursively called on all children.
   *
   * @returns An array of validation error messages, or an empty array if valid
   */
  protected validate(): string[] {
    return [];
  }

  /**
   * Performs validation on this construct and all its children.
   *
   * @returns An array of all validation errors
   */
  validateTree(): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate this construct
    const localErrors = this.validate();
    errors.push(
      ...localErrors.map((message) => ({
        path: this.path,
        message,
      }))
    );

    // Recursively validate children
    for (const child of this._children) {
      errors.push(...child.validateTree());
    }

    return errors;
  }

  /**
   * Returns a string representation of this construct.
   */
  toString(): string {
    return `${this.constructor.name}(${this.id})`;
  }
}

/**
 * Represents a validation error in the construct tree.
 */
export interface ValidationError {
  /**
   * The path to the construct that generated this error.
   */
  path: string;

  /**
   * The error message.
   */
  message: string;
}
