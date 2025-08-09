import { Col, message, Row, Tag } from "antd";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  
  const getExams = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getExams();
  }, [getExams]);

  const getCategoryColor = (category) => {
    const colors = {
      'General Knowledge': 'blue',
      'Science': 'green',
      'Mathematics': 'purple',
      'History': 'orange',
      'Geography': 'cyan',
      'Literature': 'magenta'
    };
    return colors[category] || 'default';
  };

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Quiz Application`} />
        <div className="divider"></div>
        
        {exams.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-600 text-lg">No exams available at the moment</div>
            <div className="text-gray-400 text-sm mt-2">Check back later for new quizzes!</div>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {exams.map((exam) => (
              <Col xs={24} sm={12} md={8} lg={6} key={exam._id}>
                <div className="card-lg flex flex-col gap-3 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{exam?.name}</h2>
                    <Tag color={getCategoryColor(exam.category)} className="text-xs">
                      {exam.category}
                    </Tag>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      </span>
                      <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </span>
                      <span>Passing Marks: <strong>{exam.passingMarks}</strong></span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      </span>
                      <span>Duration: <strong>{exam.duration} min</strong></span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      className="primary-outlined-btn w-full"
                      onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                    >
                      Start Exam
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    )
  );
}

export default Home;
