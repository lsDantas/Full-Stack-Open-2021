const CourseHeader = (props) => {
    return (
        <>
            <h2>{props.course.name}</h2>
        </>
    );
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>
    );
}

const Part = ({ part }) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    );
}

const Total = ({ parts }) => {
    const reducer = (sum, part) => sum + part.exercises;
    const total = parts.reduce(reducer, 0);

    return (
        <>
            <p>
                <b>Total of {total} exercises</b>
            </p>
        </>
    );
}

const Course = ({ course }) => {
    return (
        <div>
            <CourseHeader course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;