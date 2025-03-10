interface QuestionStatisticsProps {
    question: Question;
    responses: ResponseData[];
  }

  interface StatItem {
    label: string;
    count: number;
    percentage: number;
  }
  
  export const QuestionStatistics: React.FC<QuestionStatisticsProps> = ({ question, responses }) => {
    const calculateStatistics = (): StatItem[] | null => {
      if (!responses.length) return null;
      
      const totalResponses = responses.length;
      
      switch (question.questionType) {
        case 'multiple-choice':
        case 'dropdown': {
          const stats = new Map<string, number>();
          question.options?.forEach(option => stats.set(option.value, 0));
          
          responses.forEach((response:any) => {
            const answer = response.answers?.find((a:Answer) => a.questionId === question._id)?.answer;
            if (answer && typeof answer === 'string') {
              stats.set(answer, (stats.get(answer) || 0) + 1);
            }
          });
  
          return Array.from(stats.entries()).map(([value, count]) => ({
            label: question.options?.find(opt => opt.value === value)?.label || value,
            count,
            percentage: totalResponses ? Math.round((count / totalResponses) * 100) : 0
          }));
        }
  
        default:
          return null;
      }
    };
  
    if (question.questionType === 'text') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Text Responses:</h3>
          <div className="space-y-2">
            {responses.map((response: ResponseData, index: number) => {
              const answer = response.answers?.find((a:Answer) => a.questionId === question._id)?.answer;
              return answer ? (
                <div key={`${response._id}-${index}`} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{answer as string}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Response #{index + 1} ({new Date(response.createdAt).toLocaleDateString()})
                  </p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      );
    }
  
    const stats = calculateStatistics();
    if (!stats) return null;
  
    return (
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={`${question._id}-${index}`} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              <span className="text-sm text-gray-600">{stat.count} ({stat.percentage}%)</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };