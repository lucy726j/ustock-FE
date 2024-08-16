import React from 'react';
import styled from 'styled-components';
import { newsData } from '../../data/data';
import NewsItem from './NewsItem';
import { NewsProps } from '../../constants/interface';
import "./NewsItemStyle.css"

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px
`;

const NewsList: React.FC = () => {

    return (
        <div>
            <ListWrapper>
                {newsData.map((news: NewsProps) => (
                    <NewsItem key={news.id} {...news} />
                ))}
            </ListWrapper>
        </div>
    );
}

export default NewsList;
