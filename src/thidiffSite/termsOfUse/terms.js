import React from "react";
import Heading2 from "../../components/static/header/heading2";
import Headind5 from "../../components/static/header/heading5";
import List from "../../components/static/list";

const Terms = () => {
  const arrayList = [
    {
      list: "This Website, including all Materials present (excluding any applicable third party materials), is the property of ThiDiff and is copyrighted and protected by worldwide copyright laws and treaty provisions. You hereby agree to comply with all copyright laws worldwide in Your use of this Website and to prevent any unauthorized copying of the Materials. ThiDiff does not grant any express or implied rights under any patents, trademarks, copyrights or trade secret information.",
    },
    {
      list: "ThiDiff has business relationships with thousands of customers, suppliers, governments, and others. For convenience and simplicity, words like joint venture, partnership, and partner are used to indicate business relationships involving common activities and interests, and those words may not indicate precise legal relationships.",
    },
  ];

  const BLOGS = [
    {
      list: "You shall not defame, abuse, harass or threaten ThiDiff or any third party, or otherwise violate the legal rights of ThiDiff or any third party.",
    },
    {
      list: "You shall not contribute any content or take any action that may in any manner adversely affect the reputation of ThiDiff, or that is otherwise detrimental to ThiDiff.",
    },
    {
      list: "You shall not in any manner publish or post any inappropriate, defamatory, infringing, obscene, racist, terrorist, politically slanted, indecent or unlawful topic, name, material or information.",
    },
    {
      list: "You shall not use profane and objectionable language or abbreviations. You shall not use any character(s) as a substitute for objectionable language.",
    },
    {
      list: "You shall not in any manner reveal confidential or proprietary information of any third party. Specifically, You shall not post any material for which You do not have requisite and applicable right(s) under law.",
    },
    {
      list: "You shall not conduct any contests or publish or propagate any forwards.",
    },
    {
      list: "You shall not defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity but not limited to the foregoing) of any other party including ThiDiff.",
    },
    {
      list: "You shall not publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, obscene, indecent or unlawful topic, name, material or information.",
    },
    {
      list: "You shall not upload or otherwise make available, files that contain images, photographs, software or other material protected by intellectual property laws, including, by way of example, and not as limitation, copyright or trademark laws (or by rights of privacy or publicity) unless You own or control the rights thereto or have received all necessary consent to do the same.",
    },
    {
      list: "You shall not upload files that contain viruses, trojan horses, worms, time bombs, cancelbots, corrupted files, or any other similar software or programs that may damage the operation of another's computer or property of another.",
    },
    {
      list: "You shall not download any file posted that You know, or reasonably should know, cannot be legally reproduced, displayed, performed, and/or distributed in such manner.",
    },
    {
      list: "You shall not falsify or delete any copyright management information, such as author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded.",
    },
    {
      list: "You shall not create a false identity for the purpose of misleading others.",
    },
    {
      list: "You shall not in any way deface or vandalize this Website, or prevent or restrict others from using this Website.",
    },
    {
      list: "You shall indemnify and hold harmless ThiDiff from any claims and loss incurred by ThiDiff as a result of Your violation of these Terms of Use.",
    },
    {
      list: "You acknowledge that ThiDiff may, at its sole discretion, monitor, remove or edit any content that You contribute. ThiDiff may also pursue remedies available to it under law for any violation of these terms and conditions.",
    },
  ];
  return (
    <>
      <div className=" py-4" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="container">
          <Heading2
            heading="TERMS OF USE"
            className="text-center font-weight-bold py-2"
          />
          <paragraphContentSection
            paragraph="
            The use of any product, service or feature (the Materials available through the 
              internet websites accessible at ThiDiff.com, (collectively, the Website) by any 
              user of the Website (You or Your hereafter) shall be governed by the following 
              terms of use:"
          />
          <List arrayList={arrayList} />
          <paragraphContentSection
            paragraph="Use of your Personal Information"
            paragraphclass="font-weight-bold"
          />
          <Headind5 heading="LIMITED LICENSE:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="Subject to the terms and conditions set forth in these Terms of Use, ThiDiff grants You a non-exclusive, non-transferable, limited right to access, use and display this Website and the Materials thereon. You agree not to interrupt or attempt to interrupt the operation of the Website in any manner. Unless otherwise specified, the Website is for Your personal and non-commercial use. You shall not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, 
          transfer, or sell any information, software, products or services obtained from this Website."
          />
          <Headind5 heading="BLOGS:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="This is to inform and clarify that individuals 
          (including but not limited to employees of ThiDiff and referred to as “Individuals” hereafter) 
          may contribute articles and opinions on this Website entirely at the sole discretion of ThiDiff, 
          in the form of “blogs”, as such term is generally understood. You hereby acknowledge and agree 
          that these blogs constitute the opinion of the Individuals in their personal capacity, and may not represent official positions of ThiDiff in any manner. ThiDiff retains all copyright to these blogs."
          />
          <paragraphContentSection
            paragraph="You may be permitted to post comments and feedback to these blogs. By doing so, 
            You expressly agree and acknowledge to abide by the following:"
            paragraphclass="font-weight-bold"
          />
          <List arrayList={BLOGS} />
          <paragraphContentSection
            paragraph="THIRD PARTY CONTENT:"
            paragraphclass="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="
The Website makes information of third parties available, including articles, analyst reports, news 
reports, tools to facilitate calculation, company information and data about financial markets, 
including any regulatory authority and other financial markets and other data from external sources 
(the Third Party Content). You acknowledge and agree that the Third Party Content is not created or 
endorsed by ThiDiff. The provision of Third Party Content is for general informational purposes only 
and does not constitute a recommendation or solicitation to purchase or sell any securities or shares 
or to make any other type of investment or investment decision. In addition, the Third Party Content 
is not intended to provide tax, legal or investment advice. You acknowledge that the Third Party Content provided to You is obtained from sources believed to be reliable, but that no guarantees are made by ThiDiff or the providers of the Third Party Content as to its accuracy, completeness, timeliness. You agree not to hold ThiDiff, any business offering products or services through the Website or any provider of Third Party Content liable for any investment decision or other transaction You may make based on Your reliance on or use of such data, or any liability that may arise due to delays or interruptions in the delivery of the Third Party Content for any reason"
          />
          <paragraphContentSection
            paragraph="By using any Third Party Content, You may leave this Website 
          and be directed to an external website, or to a website maintained by an entity other than ThiDiff. 
          If You decide to visit any such site, You do so at Your own risk and it is Your responsibility to 
          take all protective measures to guard against viruses or any other destructive elements. 
          ThiDiff makes no warranty or representation regarding, and does not endorse, any linked Websites or 
          the information appearing thereon or any of the products or services described thereon. Links do 
          not imply that ThiDiff or this Website sponsors, endorses, is affiliated or associated with, or is 
          legally authorized to use any trademark, trade name, logo or copyright symbol displayed in or 
          accessible through the links, or that any linked site is authorized to use any trademark, trade 
          name, logo or copyright symbol of ThiDiff or any of its affiliates or subsidiaries. You hereby 
          expressly acknowledge and agree that the linked sites are not under the control of ThiDiff and 
          ThiDiff is not responsible for the contents of any linked site or any link contained in a linked 
          site, or any changes or updates to such sites. ThiDiff is not responsible for webcasting or any 
          other form of transmission received from any linked site. ThiDiff is providing these links to You 
          only as a convenience, 
          and the inclusion of any link shall not be construed to imply endorsement by ThiDiff in 
          any manner of the website."
          />
          <Headind5 heading="NO WARRANTIES:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="This website, the information and materials on the site, and any software made 
            available on the Website, are provided as is without any representation or warranty, express 
            or implied, of any kind, including, but not limited to, warranties of merchantability, 
            non-infringement, or fitness for any particular purpose. There is no warranty of any kind, 
            express or implied, regarding third party content. In spite of Thidiff  best endeavors, there 
            is no warranty on behalf of ThiDiff that this Website will be free of any computer viruses. Some 
            jurisdictions do not allow for the exclusion of implied warranties, so the above exclusions may not 
            apply to you."
            paragraphclass=""
          />
          <Headind5
            heading="LIMITATION OF DAMAGES:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="In no event shall ThiDiff or any of its subsidiaries or affiliates be liable to any entity for any direct, indirect, special, consequential or other damages (including, without limitation, any lost profits, business interruption, loss of information or programs or other data on your information handling system) that are related to the use of, or the inability to use, the content, materials, and functions of this Website or any linked Website, 
            even if ThiDiff is expressly advised of the possibility of such damages."
            paragraphclass=""
          />
          <Headind5 heading="DISCLAIMER:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="The website may contain inaccuracies and typographical and clerical errors. 
            ThiDiff expressly disclaims any obligation(s) to update this website or any of the 
            materials on this website. ThiDiff does not warrant the accuracy or completeness of 
            the materials or the reliability of any advice, opinion, statement or other information 
            displayed or distributed through the Website. You acknowledge that any reliance on any 
            such opinion, advice, statement, memorandum, or information shall be at your sole risk. 
            ThiDiff reserves the right, in its sole discretion, to correct any errors or omissions 
            in any portion of the Website. ThiDiff may make any other changes to the Website, the 
            materials and the products, programs, services or prices (if any) described in the Website 
            at any time without notice. This Website is for informational purposes only and should not be 
            construed as technical advice of any manner."
            paragraphclass=""
          />
          <Headind5
            heading="POSTING ON THE ThiDiff WEBSITE:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="ThiDiff does not claim ownership of the materials You provide to ThiDiff (including feedback and suggestions) or post, upload, input or submit to any section of the Website, (each a Submission and collectively Submissions). However, by posting, uploading, inputting, providing or submitting (Posting) 
            Your Submission You are granting ThiDiff, its affiliated companies and necessary sub-licensees 
            permission to use Your Submission in connection with the operation of their Internet businesses 
            (including, without limitation, all services offered by ThiDiff), including, without limitation, 
            the license rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, 
            edit, translate and reformat Your Submission; to publish Your name in connection with Your 
            Submission; and the right to sublicense such rights to any other party."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="You hereby acknowledge and agree that no compensation shall be paid or no 
            future commercial consideration has accrued with respect to the use of Your Submission by 
            Thidiff, as provided herein. ThiDiff shall be under no obligation to post or use any Submission
             You may provide and ThiDiff shall remove any Submission at any time at its own sole discretion."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="By Posting a Submission You hereby warrant and represent that You own or 
            otherwise control all of the rights required under worldwide law for Your Submission as 
            described in these Terms of Use including, without limitation, all the rights necessary 
            for You to provide, post, upload, input or submit the Submissions."
            paragraphclass=""
          />
          <Headind5
            heading="LAWFUL AND / OR PROHIBITED USE OF THE WEBSITE:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="As a condition of Your use of the Website, You shall not use the Website for 
            any purpose(s) that is unlawful or prohibited by the Terms of Use. You shall not use the 
            Website in any manner that could damage, disable, overburden, or impair any ThiDiff server, 
            or the network(s) connected to any ThiDiff server, or interfere with any other party's use and 
            enjoyment of any services associated with the Website. You shall not attempt to gain unauthorized 
            access to any section of the Website, other accounts, computer systems or networks connected 
            to any ThiDiff server or to any of the services associated with the Website, through hacking, 
            password mining or any other means. You shall not obtain or attempt to obtain any Materials 
            or information through any means not intentionally made available through the Website."
            paragraphclass=""
          />
          <Headind5 heading="INDEMNITY:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="You agree to indemnify and hold harmless ThiDiff, its subsidiaries and affiliates from any claim, cost, expense, judgment or other loss relating to Your use of this Website in any manner, including without limitation of the foregoing, any action You take which 
            is in violation of the terms and conditions of these Terms of Use and against any applicable law."
            paragraphclass=""
          />
          <Headind5 heading="CHANGES:" className="font-weight-bold" />
          <paragraphContentSection
            paragraph="ThiDiff reserves the rights, at its sole discretion, to change, modify, add 
            or remove any portion of these Terms of Use in whole or in part, at any time. Changes 
            
            in these Terms of Use will be effective when notice of such change is posted. Your 
            continued use of the Website after any changes to these Terms of Use are posted will be 
            considered acceptance of those changes. Thidiff may terminate, change, suspend or 
            discontinue any aspect of the Website, including the availability of any feature(s) 
            of the Website, at any time. ThiDiff may also impose limits on certain features and 
            services or restrict Your access to certain sections or all of the Website without notice 
            or liability. You hereby acknowledge and agree that ThiDiff may terminate the authorization, rights and license given above at any point of time at its own sole discretion and upon such termination; You shall immediately destroy all Materials."
            paragraphclass=""
          />
          <p>
            Email:<a href="">hello@thidiff.com</a>
          </p>
          <Headind5
            heading="INTERNATIONAL USERS AND CHOICE OF LAW:"
            className="font-weight-bold"
          />
          <paragraphContentSection
            paragraph="This Site is controlled, operated and administered by ThiDiff from its offices 
            within India. ThiDiff makes no representation that Materials on this Website are appropriate 
            or available for use at any other location(s) outside India. Any access to this Website from 
            territories where their contents are illegal is prohibited. You may not use the Website or export 
            the Materials in violation of any applicable export laws and regulations. If You access this 
            Website from a location outside India, You are responsible for compliance with all local laws."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="These Terms of Use shall be governed by the laws of India, without giving effect 
            to its conflict of laws provisions. You agree that the appropriate court(s) in Bangalore, India, 
            will have the exclusive jurisdiction to resolve all disputes
             arising under these Terms of Use and You hereby consent to personal jurisdiction in such forum."
            paragraphclass=""
          />
          <paragraphContentSection
            paragraph="These Terms of Use constitutes the entire agreement between ThiDiff and You 
            with respect to Your use of the Website. Any claim You may have with respect to Your use 
            of the Website must be commenced within one (1) year of the cause of action. If any 
            provision(s) of this Terms of Use is held by a court of competent jurisdiction to be 
            contrary to law then such provision(s) shall be severed from this Terms of Use and 
            the other remaining provisions of this Terms of Use shall remain in full force and effect."
            paragraphclass=""
          />
        </div>
      </div>
    </>
  );
};

export default Terms;
