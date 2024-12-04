import { Link, useRouteError } from 'react-router-dom';

import css from './mainErrorPage.module.scss';

export function MainErrorPage() {
  const error: any = useRouteError();

  return (
    <div className={css.errorPage}>
      <h1 className={css.errorPageTitle}>Oops!</h1>
      <p className={css.errorPageText}>Sorry, something went wrong.</p>
      <p className={css.errorPageText}>
        <strong>{error?.status}</strong>
        <i>{error?.statusText || error?.message || 'Unknown error'}</i>
      </p>
      <Link
        className={css.errorPageLink}
        to="/"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
