export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface CourseGeneralPart extends CoursePartBase {
    description: string;
}

export interface CourseNormalPart extends CourseGeneralPart {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseGeneralPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseGeneralPart {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
