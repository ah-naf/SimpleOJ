export interface TestcaseType {
    input: string,
    output: string,
    sample: boolean,
    explanation ?: string
}

export interface PropblemDetailType {
    slug: string
    input: string
    title: string
    output: string
    constraints: string
    statement: string
    desc: string
}