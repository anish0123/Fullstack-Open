const Course = ({ course }) => {
  
  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  const Total = ({ parts }) => {
    const totalSum = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <h3>total of {totalSum} exercises</h3>;
  };
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
