import { Link } from 'react-router-dom';

import { AppIcon } from '@/components/shared';

const Footer = () => {
  return (
    <div className="w-full bg-[#22005d] px-5 py-[5.875rem] lg:px-[11.625rem] lg:py-0">
      <div className="flex w-full flex-col items-center justify-between border-b border-b-[#4F378A] pb-14 pt-10 lg:flex-row lg:pt-[6.25rem]">
        <AppIcon
          className="mb-14 lg:mb-0"
          height="40px"
          name="logo_white"
          width="150px"
        />
        <div className="mt-4 grid w-full grid-cols-1 justify-items-center gap-5 text-xl font-normal leading-7 text-white lg:mt-0 lg:flex lg:w-fit lg:gap-10">
          <Link to="https://foreon.network/#about">About</Link>
          <Link to="#">Whitepaper</Link>
          <Link to="https://foreonnetwork.medium.com/">Blog</Link>
          <Link to="https://docs.foreon.network/privacy-policy">
            Privacy Policy
          </Link>
          <Link to="https://docs.foreon.network/terms-of-service">
            Terms Of Service
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center justify-between lg:flex-row lg:pb-[5.75rem] lg:pt-14">
        <div className="flex items-center gap-2">
          <AppIcon name="copy_right" />
          <span className="text-[0.75rem] text-neutralVariant-80">
            2023 Foreon. All Right Reserved
          </span>
        </div>
        <div className="flex items-center gap-4 py-12 lg:py-0">
          <Link to="#">
            <AppIcon name="x_logo" />
          </Link>
          <Link to="#">
            <AppIcon name="discord" />
          </Link>
          <Link to="#">
            <AppIcon name="medium_logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
