/* const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object
  console.log('base query', { query });
  console.log('base queryObj', { queryObj });
  
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = ''; // SET DEFAULT VALUE
  if (query?.searchTerm) {
    // IF searchTerm  IS GIVEN SET IT
    searchTerm = query?.searchTerm as string;
  }
  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  // { email: { $regex : query.searchTerm , $options: i}}

  // DYNAMICALLY DOING IT USING LOOP in JS [field]
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  // console.log('search', searchQuery);

  // FILTERING fUNCTIONALITY:
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({ query }, { queryObj });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // sorting fUNCTIONALITY:
  let sort = '-createdAt'; // SET DEFAULT VALUE

  // IF sort  IS GIVEN SET IT

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  // PAGINATION FUNCTIONALITY:
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  // FIELDS LIMITING FUNCTIONALITY:

  let fields = '-__v'; //exclude fields
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log(fields);
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};  */
