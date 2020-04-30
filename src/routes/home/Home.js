import React from 'react';
import { Typography } from 'antd';

const {Title, Paragraph, Text} = Typography;

export default function Home({title}) {
  return (
    <Typography>
      <Title>{title}</Title>
      <Paragraph>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties and
        duplication and reduce the efficiency of development.
      </Paragraph>
      <Paragraph>
        After massive project practice and summaries, Ant Design, a design language for background
        applications, is refined by Ant UED Team, which aims to
        <Text strong>
          uniform the user interface specs for internal background projects, lower the unnecessary
          cost of design differences and implementation and liberate the resources of design and
          front-end development
        </Text>.
      </Paragraph>
    </Typography>
  );
}


