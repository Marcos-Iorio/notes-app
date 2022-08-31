import React, {ChangeEvent} from "react";

import InputSelect from "../select/InputSelect";
import { ChangeProps } from "../select/InputSelect";

import styles from './Filter.module.scss';

const Filter = (props: ChangeProps) => {

    const categorieChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    };

  return (
    <section className={styles.filter_wrapper}>
      <div className={styles.filters}>
        <InputSelect onChange={categorieChangeHandler} all={true} />
      </div>
    </section>
  );
};

export default Filter;
