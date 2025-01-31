import React from 'react';
import { css } from '@emotion/react';

export interface AnsibleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Supported/unsupported variant flag */
  isSupported?: boolean;
  /** Red Hat Ansible Automation Platform technology icon */
  isRHAAP?: boolean;
  /** Ansible icon className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const RHAAPTechnologyIcon = 
<svg
  width="24" height="24" viewBox="0 0 38 38"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      {`.uuid-6998fa22-ec9a-4e2f-9d0d-f4bc3361e80e{fill:#e00;}`}
      {`.uuid-2a01d04c-89d4-48ba-a2d8-51034215da9b{fill:#fff;}`}
      {`.uuid-a19226e8-b71f-481c-815f-1ed60f4363a6{fill:#4d4d4d;}`}
    </style>
  </defs>
  <rect x="1" y="1" width="36" height="36" rx="9" ry="9"/>
  <path className="uuid-a19226e8-b71f-481c-815f-1ed60f4363a6" d="m28,2.25c4.27338,0,7.75,3.47664,7.75,7.75v18c0,4.27336-3.47662,7.75-7.75,7.75H10c-4.27338,0-7.75-3.47664-7.75-7.75V10c0-4.27336,3.47662-7.75,7.75-7.75h18m0-1.25H10C5.02942,1,1,5.02944,1,10v18c0,4.97057,4.02942,9,9,9h18c4.97058,0,9-4.02943,9-9V10c0-4.97056-4.02942-9-9-9h0Z"/>
  <path className="uuid-2a01d04c-89d4-48ba-a2d8-51034215da9b" d="m15,23.625c-.08594,0-.17383-.01758-.25684-.05566-.31445-.1416-.45508-.51172-.3125-.82617l2.02051-4.48145c.00293-.00586.00586-.01172.00781-.01758l1.97168-4.36914c.20117-.44922.9375-.44922,1.13867,0l4,8.86816c.11814.25977.04395.56641-.17871.74512-.22266.17773-.53613.18262-.7666.01172l-5.34961-4.02148-1.70508,3.77832c-.10352.23145-.33105.36816-.56934.36816Zm2.80078-5.31445l3.62891,2.72754-2.42969-5.38574-1.19922,2.6582Z"/>
  <path className="uuid-6998fa22-ec9a-4e2f-9d0d-f4bc3361e80e" d="m19,30.125c-6.13477,0-11.125-4.99023-11.125-11.125s4.99023-11.125,11.125-11.125,11.125,4.99023,11.125,11.125-4.99023,11.125-11.125,11.125Zm0-21c-5.44531,0-9.875,4.42969-9.875,9.875s4.42969,9.875,9.875,9.875,9.875-4.42969,9.875-9.875-4.42969-9.875-9.875-9.875Z"/>
</svg>;

const styles = {
  ansible: css`
    & svg {
      height: var(--pf-t--global--font--size--xl);
      position: relative;
      top: 0.25rem;
    }
  `,
  ansibleSupported: css`
    & .st0 {
      fill: var(--pf-t-global--icon--color--regular);
    }
  `,
  ansibleUnsupported: css`
    & .st0, & .st1, & .st2 {
      fill: var(--pf-t--global--icon--color--disabled);
      cursor: not-allowed;
    }
  `
};

const Ansible: React.FunctionComponent<AnsibleProps> = ({ isSupported = true, isRHAAP, className, ouiaId = "Ansible-icon", ...props }: AnsibleProps) => {
  const ansibleLogoClass = css`
    ${styles.ansible};
    ${isSupported ? styles.ansibleSupported : styles.ansibleUnsupported};
    ${className || ''};
  `;

  const unsupportedSlash = (
    <React.Fragment>
      <rect
        x="1245.1"
        y="272.4"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 3082.5815 -510.474)"
        className="st0"
        width="803.8"
        height="221.5"
      />
  
      <rect
        x="-279.7"
        y="904"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 2450.9683 1014.3757)"
        className="st1"
        width="2590.2"
        height="221.5"
      />
  
      <rect
        x="17.1"
        y="1620.5"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 1734.4641 2744.1697)"
        className="st0"
        width="563.7"
        height="221.5"
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {isRHAAP ? (
        <i title="Red Hat Ansible Automation Platform" data-ouia-component-id={ouiaId} {...props}>
          {RHAAPTechnologyIcon}
        </i>
      ) : (
        <i css={ansibleLogoClass} title={isSupported ? "Ansible supported" : "Ansible is not supported" } data-ouia-component-id={ouiaId} {...props}>
          <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 2032 2027.2"
            css={css`enableBackground: new 0 0 2032 2027.2`}
          >
            <path
              className="st0"
              d="M2030.8,1014.8c0,559.2-453.3,1012.4-1012.4,1012.4C459.2,2027.2,5.9,1574,5.9,1014.8
                        C5.9,455.7,459.2,2.4,1018.3,2.4C1577.5,2.4,2030.8,455.7,2030.8,1014.8 M1035.4,620.9l262,646.6L901.7,955.8L1035.4,620.9
                        L1035.4,620.9z M1500.8,1416.5l-403-969.9c-11.5-28-34.5-42.8-62.4-42.8c-28,0-52.7,14.8-64.2,42.8L528.9,1510.4h151.3l175.1-438.6
                        l522.5,422.1c21,17,36.2,24.7,55.9,24.7c39.5,0,74-29.6,74-72.3C1507.7,1439.4,1505.3,1428.3,1500.8,1416.5L1500.8,1416.5z"
            />
            {isSupported ? null : unsupportedSlash}
          </svg>
        </i>
      )}
    </React.Fragment>
  );
};

export default Ansible;
