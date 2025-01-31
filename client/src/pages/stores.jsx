import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Panel from '../components/panel';
import { getStores } from '../services/store-service';

const StyledContainer = styled.div`
  padding: 5px;
  background: #20B2AF;
  color: #ffffff;
  margin: 5px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 7px 7px 3px rgb(0 0 0 / 50%);
`;

const StyledCircle = styled.div`
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background: #ddd;
  color: #20B3B1;
  text-align: center;
  font: 20px Arial, sans-serif;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.span`
  padding: 5px;
  font: 20px Cursive;
  font-weight: 800;
  display: flex;
`;

export default function Stores(props) {
  const history = useHistory();
  const [storeItems, setStoreItems] = useState([]);
  const [stores, setStores] = useState({});

  useEffect(() => {
    function navigateToStore(store) {
      history.push('/Users', { store: store });
    }

    getStores().then((storeList) => {
      setStores(storeList);
      const storeItemList = storeList.map((store) => (
        <StyledContainer
          onClick={() => navigateToStore(store)}
          className="col-8"
          key={store.number}
        >
          <div className="row">
            <div className="col-2">
              <StyledCircle>{store.number}</StyledCircle>
            </div>
            <div className="col-10">
              <StyledText>{store.name}</StyledText>
            </div>
          </div>
        </StyledContainer>
      ));
      setStoreItems(storeItemList);
    });

    return () => {
      setStoreItems([]);
    };
  }, [setStoreItems, history]);

  return (
    <Panel title="Tiendas" size="small" model={stores}>
      <div className="row justify-content-center">{storeItems}</div>
    </Panel>
  );
}
