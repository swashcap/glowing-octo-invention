/**
 * Type representing a response from a GraphQL endpoint
 * {@link https://graphql.github.io/graphql-spec/draft/#sec-Response-Format}
 */
export interface GraphQLResponse<D extends any> {
  data?: D
  errors?: {
    extensions?: any
    location?: { column: number; line: number }[]
    message: string
    path?: Array<number | string>
  }
}

export abstract class ApiError extends Error {
  body?: GraphQLResponse<any> | Error
  abstract code: string
  headers: Response['headers']
  status: Response['status']
  statusText: Response['statusText']
  type: Response['type']
  url: Response['url']
}

export class ApiResponseStatusError extends ApiError {
  code = 'API_RESPONSE_STATUS_ERROR'
}

export class ApiResponseParseError extends ApiError {
  code = 'API_RESPONSE_PARSE_ERROR'
}

export class ApiResponseGraphQLError extends ApiError {
  code = 'API_RESPONSE_GRAPHQL_ERROR'
}

export class ApiResponseNoDataError extends ApiError {
  code: 'API_RESPONSE_NO_DATA_ERROR'
}

export interface ApiOptions {
  query: string
  variables?: Object
}

export const makeRequest = async <Data extends any = any>(
  { query, variables }: ApiOptions,
  requestInit?: RequestInit
): Promise<Data> => {
  const body: any = { query }

  if (variables) {
    body.variables = variables
  }

  const response = await fetch('http://localhost:3001/graphql', {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...requestInit
  })

  let json: GraphQLResponse<Data> | undefined = undefined
  let jsonParseError: Error | undefined = undefined

  try {
    json = await response.json()
  } catch (error) {
    jsonParseError = error
  }

  const populateError = (error: ApiError, body?: any): Readonly<ApiError> => {
    if (body) {
      error.body = body
    }

    error.headers = response.headers
    error.status = response.status
    error.statusText = response.statusText
    error.type = response.type
    error.url = response.url

    return error
  }

  if (!response.ok) {
    throw populateError(
      new ApiResponseStatusError(
        `Response returned a HTTP error: ${response.statusText ||
          response.status ||
          'unknown'}`
      ),
      json || jsonParseError
    )
  } else if (!json) {
    throw populateError(
      new ApiResponseParseError('Response was not parse-able'),
      jsonParseError
    )
  } else if (json.errors) {
    throw populateError(
      new ApiResponseGraphQLError('Response returned a GraphQL error'),
      json
    )
  } else if (!json.data) {
    throw populateError(new ApiResponseNoDataError('Response returned no data'))
  }

  return json.data
}

export const makeQuery = <D>(options: ApiOptions) =>
  makeRequest<D>(options, { method: 'GET' })

export const makeMutation = <D>(options: ApiOptions) =>
  makeRequest<D>(options, { method: 'POST' })
