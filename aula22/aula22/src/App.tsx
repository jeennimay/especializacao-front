import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import { fetchProductsStarted, fetchProductsThunk, filterProductsThunk } from './store/actions/products.action';


type GlobalState = {
  product: {
    products: {
      id: number,
      title: string,
      price: number,
      description: string,
      category: string,
      image: string,
      rating:
      {
        rate: number,
        count: number,
      }
    }[];
    isFetching: boolean;
    errorMessage: string;
  }
}

function App() {
  const product = useSelector((state: GlobalState) => state.product);
  const dispatch = useDispatch();
  const [text, setText] = useState();

  useEffect(() => {
    dispatch(fetchProductsStarted());
    fetchProductsThunk()(dispatch);
  }, [dispatch]);


  const handlerClick = (e: any) => {
    e.preventDefault();

    if (!text) {
      fetchProductsThunk()(dispatch);
    } else {
      filterProductsThunk(text)(dispatch);
    }
  }

  const handlerOnChange = (e: any) => {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <input type="text" name="filterText" id="filterText" value={text} onChange={handlerOnChange} />
      <button onClick={handlerClick}>Search</button>
      {/* error message */}
      {
        product.errorMessage &&
        <>
          <p className='span'>Oops, something went wrong...</p>
          <p>Error: {product.errorMessage}</p>
        </>
      }
      {/* Loading message */}
      {product.isFetching && <p className='span'>Loading...</p>}
      {/* Success data */}
      {
        product.products &&
        <section className='products'>
          {product.products.map((prod: any) =>
              <div className='prod-card' key={prod.id}>
                <div className='prod-pic'>
                  <img src={prod.image} alt={prod.title} />
                </div>
                <div className='prod-data'>
                  <p className='prod-title'>{prod.title}</p>
                  <p className='prod-rating'><code>&#9733;</code> {prod.rating.rate} ({prod.rating.count})</p>
                  <p className='prod-category'>{prod.category}</p>
                  <p className='prod-price'>$ {prod.price}</p>
                </div>
              </div>
          )}
        </section>
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  products: state.fetchProductsReducer,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators(
  {
    fetchProductsThunk, filterProductsThunk
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
