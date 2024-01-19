import React from "react";
import SVG from "react-inlinesvg";
import brandIcon from "./brand.svg";
import compactIconDown from "./compactDownIcon.svg";
import compactIconUp from "./compactUp.svg";
import FaceBook from "./faceBook.svg";
import chevronDownIcon from "./iconChevronDown.svg";
import chevronLeftIcon from "./iconChevronLeft.svg";
import chevronRightIcon from "./iconChevronRight.svg";
import chevronUpIcon from "./iconChevronUp.svg";
import crossIcon from "./iconCross.svg";
import editIconAlt from "./iconEditAlt.svg";
import infoTextIcon from "./iconInfo.svg";
import linkIcon from "./iconLink.svg";
import moreIconVertical from "./iconMoreVertical.svg";
import paperclipIcon from "./iconPaperClip.svg";
import pulseIcon from "./iconPlus.svg";
import testSuiteIcon from "./iconTestSuites.svg";
import trashIcon from "./iconTrash.svg";
import userIcon from "./iconUser.svg";
import Instagram from "./instagram.svg";
import linkedIn from "./linkedIn.svg";
import helpIcon from "./navIconHelp.svg";
import searchIcon from "./navIconSearch.svg";
import productIcon from "./product.svg";
import rupeeIcon from "./rupeeIcon.svg";
import stopCircleIcon from "./stopCircle.svg";
import timerIcon from "./timer.svg";
import twitter from "./twitter.svg";
import uploadIcon from "./upload.svg";
import verifyIcon from "./verify.svg";
import youTube from "./youTube.svg";
import successIcon from "./iconSuccess.svg";
import errorIcon from "./iconError.svg";
import inventoryIcon from "./inventory.svg";
import categoryIcon from "./catagories.svg";
import vendorIcon from "./vendor.svg";
import tagsIcon from "./tags.svg";
import ordersIcon from "./orders.svg";
import emailIcon from "./envelope.svg";
import systemLogIcon from "./systemLogIcon.svg";
import schedulerIcon from "./schedulerIcon.svg";
import vendorProductIcon from "./shopVendorIcon.svg";
import iconDownload from "./iconDownload.svg";
import stockEntry from "./stockEntry.svg";

const InlineInfoIcon = () => <SVG src={infoTextIcon} />;
const MoreIconVertical = () => <SVG src={moreIconVertical} alt="more" />;
const ChevronDown = () => <SVG src={chevronDownIcon} alt="chevron down" />;
const ChevronUp = () => <SVG src={chevronUpIcon} alt="chevron up" />;
const ChevronLeft = () => <SVG src={chevronLeftIcon} alt="chevron left" />;
const UserIcon = () => <SVG src={userIcon} />;
const EditIconAlt = () => <SVG src={editIconAlt} />;
const HelpIcon = ({ headerTextColor }) => (
  <SVG src={helpIcon} fill={headerTextColor} alt="help" />
);
const ChevronRight = () => <SVG src={chevronRightIcon} alt="chevron right" width ="15px" height="15px"/>;
const SearchIcon = () => <SVG src={searchIcon} alt="search" />;
const TrashIcon = () => <SVG src={trashIcon} />;
const CrossIcon = () => <SVG src={crossIcon} />;
const RupeeIcon = () => <SVG src={rupeeIcon} alt="Rs." />;
const LinkIcon = () => <SVG src={linkIcon} alt="link" />;
const PaperLinkIcon = () => <SVG src={paperclipIcon} alt="paperclip" />;
const HoldIcon = () => <SVG src={stopCircleIcon} alt="hole" />;
const TimerIcon = () => <SVG src={timerIcon} alt="timer" />;
const VerifyIcon = () => <SVG src={verifyIcon} alt="timer" />;
const UploadIcon = () => <SVG src={uploadIcon} alt="timer" />;
const TestSuiteIcon = () => <SVG src={testSuiteIcon} />;
const PlusIcon = () => <SVG src={pulseIcon} />;

const ProjectIcon = () => <SVG src={projectIcon} />;
const ProductIcon = () => <SVG src={productIcon} />;
const BrandIcon = () => <SVG src={brandIcon} />;
const CompactDownIcon = () => <SVG src={compactIconDown} />;
const CompactUpIcon = () => <SVG src={compactIconUp} />;
const FaceBookIcon = () => <SVG src={FaceBook} />;
const InstagramIcon = () => <SVG src={Instagram} />;
const LinkedInIcon = () => <SVG src={linkedIn} />;
const TwitterIcon = () => <SVG src={twitter} />;
const YouTubeIcon = () => <SVG src={youTube} />;
const SuccessIcon = () => <SVG src={successIcon} />;
const ErrorIcon = () => <SVG src={errorIcon} />;
const InventoryIcon = () => <SVG src={inventoryIcon} />;
const CategoryIcon = () => <SVG src={categoryIcon} />;
const SupplierIcon = () => <SVG src={vendorIcon} />;
const TagsIcon = ()=><SVG src = {tagsIcon} width="20px" height="20px" />;
const OrderIcon = ()=><SVG src = {ordersIcon} />;
const EmailIcon = ()=> <SVG src={emailIcon} width="20px" height="20px" />;
const SystemLogIcon = () => <SVG src={systemLogIcon} width="20px" height="20px" />;
const SchedulerIcon = () => <SVG src={schedulerIcon} width="20px" height="20px" />;
const VendorProductIcon = () => <SVG src={vendorProductIcon} width="20px" height="20px" />;
const IconDownload = () => <SVG src={iconDownload} />;
const StockEntry = () => <SVG src={stockEntry} />

export {
  InlineInfoIcon,
  MoreIconVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  UserIcon,
  EditIconAlt,
  HelpIcon,
  ChevronRight,
  SearchIcon,
  TrashIcon,
  CrossIcon,
  RupeeIcon,
  PaperLinkIcon,
  LinkIcon,
  HoldIcon,
  TimerIcon,
  PlusIcon,
  VerifyIcon,
  UploadIcon,
  // DefaultProductIcon,
  SupplierIcon,
  CategoryIcon,
  InventoryIcon,
  TestSuiteIcon,
  ProjectIcon,
  ProductIcon,
  BrandIcon,
  CompactDownIcon,
  CompactUpIcon,
  FaceBookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
  SuccessIcon,
  ErrorIcon,
  TagsIcon,
  OrderIcon,
  EmailIcon,
  SystemLogIcon,
  SchedulerIcon,
  VendorProductIcon,
  IconDownload,
  StockEntry
};
