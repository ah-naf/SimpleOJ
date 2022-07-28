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

export interface ProblemType extends PropblemDetailType {
    testcase ?: TestcaseType[],
    updatedAt: string,
    createdAt: string
    _id: string,
    whoSolved: string[],
    createdBy: string
}

export interface UserType {
    _id: string,
    googleId: string,
    displayName: string,
    image: string
}

export interface UserSubmissionType {
    language: string,
    filepath: string,
    startedAt: string,
    completedAt: string
    verdict: string
    submittedAt: string
}