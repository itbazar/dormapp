import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { products } from '../../globalData/InitialData';
import PropTypes from 'prop-types';

const ProductInfo = ({ categories, product, save }) => {
    const { register, handleSubmit, watch, errors, reset } = useForm({defaultValues:{...product}});

    useEffect(() => {
       reset({...product});
       console.log('product');
       console.log(product);
    }, [product])

    const submitForm = data => {
        console.log(data);
        console.log(watch("id"));
        save(data);
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <input type="hidden" name="id" ref={register}/>
            <div class="form-group">
                <label for="title">عنوان محصول</label>
                <input type="text" name="title" ref={register({ required: true, minLength: 5 })} className="form-control" />
                {errors.title && errors.title.type === "required" && <small class="form-text text-danger">عنوان اجباری می باشد</small>}
                {errors.title && errors.title.type === "minLength" && <small class="form-text text-danger">حداقل 5 کاراکتر</small>}
            </div>
            <div class="form-group">
                <label for="title">گروه محصول</label>
                <select name="categoryId" ref={register({required:true})} className="form-control">
                    <option value="">انتخاب کنید</option>
                    {categories.map((item, index) => <option value={item.id}>{item.title}</option>)}
                </select>
                {errors.categoryId && <small class="form-text text-danger">گروه اجباری می باشد</small>}
            </div>
            <div class="form-group">
                <label for="price">قیمت</label>
                <input type="text" name="price" ref={register({ pattern: /\d+/ })} className="form-control" />
                {errors.price && <small class="form-text text-danger">مقدار عددی وارد کنید</small>}
            </div>
            <button type="submit" class="btn btn-primary">ذخیره</button>
        </form>
    )
}

ProductInfo.propTypes = {
    categories: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    product:PropTypes.object
}


ProductInfo.defaultProps = {
    categories: [],
    product: {},
  };


export default React.memo(ProductInfo);
