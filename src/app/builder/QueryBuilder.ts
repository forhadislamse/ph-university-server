import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery; // this.modelQuery = Student.find()
    this.query = query; // this.query = { searchTerm: 'for'}
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    // this.modelQuery = Previous query + .find({ email: 'roben@gmail.com' })
    // So it's like applying a second `.find()` on top of previous query
    return this;
  }

  sort() {
    const sort =
      (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
    if (sort) {
      this.modelQuery = this.modelQuery.sort(sort);
      // this.modelQuery = Previous query + .sort('name createdAt') OR .sort('-createdAt')
    }
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    // this.modelQuery = Previous query + .skip(skip).limit(limit)

    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    // this.modelQuery = Previous query + .select('email name.firstName') or .select('-__v')

    return this;
  }
}
export default QueryBuilder;
