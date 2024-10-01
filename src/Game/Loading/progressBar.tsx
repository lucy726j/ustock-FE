import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  max-width: 400px;
  /* margin: 15px auto; */
  margin: 0.1rem 1rem 1rem 0.5rem;

  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  border: 2px solid #ff79c6;
  height: 30px;
`;

const Bar = styled.div`
  background: linear-gradient(90deg, #ff79c6, #8be9fd);
  height: 20px;
  border-radius: 50px;
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  color: white;
  font-weight: bold;
  z-index: 1;
  font-size: 12px;
  margin-left: 7px;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Container>
      <Bar
        style={{
          width: `${progress}%`,
        }}
      >
        <Text>{progress.toFixed(0)}%</Text>
      </Bar>
    </Container>
  );
};

export default ProgressBar;
