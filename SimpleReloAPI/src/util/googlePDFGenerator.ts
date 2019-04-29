import * as PdfTable from 'voilab-pdf-table';
import Benefit from '../interfaces/benefit';
//import { PdfFile } from '../interfaces/pdfFile';


function getPunctuatedAmount(amtDetails: string){

  let foundCountry = amtDetails.split("|");
  
  let  rep1 = /^(\d{1,3})(\d\d\d)(\d\d\d)$/gi;
  foundCountry[1] = foundCountry[1].replace(rep1, "$1,$2,$3");
    
    rep1 = /^(\d{1,3})(\d\d\d)$/gi;
    foundCountry[1] = foundCountry[1].replace(rep1, "$1,$2");
return foundCountry;
}

// Google Specific Transferee Document
// Google blue #4285F4
export default function generateGooglePDF(doc: any, file: PdfFile) {
  const {
    HostCountry,
    IntraRegionalFlg,
    SelectedBenefits,
    FamilyMoving,
    ParentMoving,
    NumChildren,
    PDFSalutation,
    CashOutAmount,
    SpouseMoving,
    CashOutAmt, //from web service
    CashOutAmtCurrCd,
    CashOutAmtCurrTyp,
    CashOutAmtCurr,
    CashOutAmountFromService    
  } = file;

  if (SelectedBenefits.length === 1 && SelectedBenefits[0].BenefitID === '737399999') {

    if(SelectedBenefits[0].PolicyID===3103227 || SelectedBenefits[0].PolicyID===2103211 || SelectedBenefits[0].PolicyID===109737)
    {     
      doc
      .text(
        `As you’ve chosen Cash Out you’ll receive a relocation bonus of ${CashOutAmountFromService} (gross, this amount will be taxed) in your first full paycheck.`
      )
      .moveDown();
    }
    else{
      doc
      .text(
        `As you’ve chosen Cash Out you’ll receive a relocation bonus of ${CashOutAmount} (gross, this amount will be taxed) in your first full paycheck.`
      )
      .moveDown();

    }

    doc      
      .text(
        `The Cash Out is considered to be taxable income and will be subject to all applicable taxes and withholdings in accordance with local tax regulations, and will not be grossed-up by Google.`
      )
      .moveDown()
      .text(
        `As you have chosen this option, you will be self-managing all parts of your move and you will assume full responsibility for any issues that arise.`
      )
      .moveDown()
      .text(
        `The ReloTeam at Google will be notified of this change. They will facilitate the payment. Google may issue a new Offer Letter. If so, please ensure this letter is signed as soon as received and returned immediately to ensure there are no delays with your on-boarding process (i.e. internal access).`
      ).moveDown();
        
      doc.text(`Sincerely,\nGoogle`);
  } 
  
  else
  {    
    let count=0;
    let countryFound='';
    SelectedBenefits.map((benefit: Benefit) => {
    
    if(benefit.BenefitID==='7373270A' || benefit.BenefitID==='737399999')
    {
      if(benefit.BenefitID==='7373270A'){
        countryFound = benefit.DestionationCtryCd;
      }
      count = count+1;
    }    
    });

    if(count==2)
    {
      if(SelectedBenefits[0].PolicyID===3103227 || SelectedBenefits[0].PolicyID===2103211 || SelectedBenefits[0].PolicyID===109737)
    {     
      doc
      .text(
        `As you’ve chosen Cash Out you’ll receive a relocation bonus of ${CashOutAmountFromService} (gross, this amount will be taxed) in your first full paycheck.`
      )
      .moveDown();
    }
    else{
      doc
      .text(
        `As you’ve chosen Cash Out you’ll receive a relocation bonus of ${CashOutAmount} (gross, this amount will be taxed) in your first full paycheck.`
      )
      .moveDown();

    }

    doc
      .text(
        `The Cash Out is considered to be taxable income and will be subject to all applicable taxes and withholdings in accordance with local tax regulations, and will not be grossed-up by Google.`
      )
      .moveDown()
      .text(
        `As you have chosen this option, you will be self-managing all parts of your move and you will assume full responsibility for any issues that arise.`
      )
      .moveDown()
      .text(
        `The ReloTeam at Google will be notified of this change. They will facilitate the payment. Google may issue a new Offer Letter. If so, please ensure this letter is signed as soon as received and returned immediately to ensure there are no delays with your on-boarding process (i.e. internal access).`
      ).moveDown();
  
      let amtDetails = countryFound;
      let rep = /{amount}/gi;         
      //console.log(benefit.DestionationCtryCd);
      let foundCountry = getPunctuatedAmount(amtDetails);
      let firstLine= 'You have also opted in to use a language learning benefit. Google will reimburse local language learning expenses for you and each of your eligible family members, up to {currency} {amount} per eligible family member, within a year from your official start date. If the entire allowance is not used, the remaining balance will be forfeited and will not be credited to you. The language learning benefit cap is per eligible relocating individual and cannot be transferred between family members.';
     
      firstLine = firstLine.replace(rep,foundCountry[1]);          
      rep= /{currency}/gi; 
      firstLine = firstLine.replace(rep,foundCountry[2]); 
      
      doc.text(firstLine)
      .moveDown()
      .text('Qualifying expenses include language learning classes, language learning app/video subscriptions and learning materials (course books, activity books) required as part of the class curriculum. Language learning is to be self-organized with a provider of your choice.')
      .moveDown()
      .text('Note that expenses for courses other than language courses (including children’s playgroups), newspaper/magazine subscriptions, as well as movies and books and other incidentals are not covered expenses and will not be reimbursed under this benefit.')
      .moveDown()
      .text('Eligibility requirements and reimbursement process details will be communicated to you by your relocation consultant.')
      .moveDown()
      .text(`Sincerely,\nGoogle`);
    }
    else 
    {
      doc.text(PDFSalutation).moveDown();
  
      doc.moveDown();
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Global Relocation Policies and Procedures');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text('This policy supersedes all prior relocation policies and statements.')
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Time Limitations');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Relocation benefits are available for up to one year from the commencement date in your new position.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Eligible Family Member');
  
      let eligibleFamilyText =
        'This policy covers you, your partner, and dependent children who permanently reside with you. Partner is defined as: spouse, fiancé and domestic partner.';
  
      if (HostCountry === 'India' && IntraRegionalFlg) {
        eligibleFamilyText =
          'As you are moving within India, this policy covers you, your partner, dependent children, and parents/parents-in-law who permanently reside with you. Partner is defined as: spouse, fiancé and domestic partner.';
      }
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(eligibleFamilyText)
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Relocation Consultant');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Cartus will assign a Relocation Consultant to assist you with managing your relocation. This designated Relocation Consultant will serve as the primary point of contact during your relocation. All expenses should be submitted directly to Cartus.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Expense Reimbursement');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'All relocation expenses must be submitted to Cartus with supporting receipts. Relocation expenses must be submitted within 3 months from the date incurred. No reimbursements will be made for any relocation expenses incurred or submitted beyond one year from the effective date in the new position.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Income Taxes');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Even though certain moving expenses may be exempt from income taxes, Google may be required to report them to local tax authorities for informational purposes, depending on the country. In countries requiring informational reporting, amounts paid to you, or on your behalf, for moving expenses must be reported as earnings on your income tax return in the calendar year/s in which the reimbursements/payments occur.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Tax Assistance');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'To lessen the tax burden of relocation, Google will provide tax assistance, or gross ups, on most taxable relocation expenses in the destination location. A “gross up” is an additional payment made to offset taxes on relocation expenses paid by Google. The purpose of the tax gross up is to lessen your tax burden and may not cover the full tax liability of the relocation expenses.\n\nGoogle will calculate the gross up on a monthly basis. Payments will be remitted directly to the government taxing authorities based on the statutory required payroll withholding rate. If there is no withholding tax obligation, the gross up will be paid directly to you through local payroll. The gross up tax rate is determined by Google and may differ from your personal tax rate.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Repayment to the Company');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Upon voluntary termination of employment, all continuing relocation benefits and reimbursements will cease as of the date of termination. In addition, if the date of termination is within 12 (twelve) months of the commencement date in the new role, you will be required to repay Google a prorated amount of all relocation benefits. In the event that the total benefits and reimbursements paid out by Google to you are in excess of $100,000.00 or equivalent local currency and if the date of termination is within 24 (twenty four) months of the commencement date in the new role, you will be required to repay Google a prorated amount of all relocation benefits. Should benefits and reimbursements be in excess of $25,000.00 or equivalent local currency, upon termination of employment, you will be required to sign a promissory note with the terms of repayment. Said note will require repayment to be made to Google within 180 days of termination. Repayments may also require an adjustment to taxes that have previously been grossed up, withheld, and reported, impacting the prorated amount you may be required to pay back.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Policy Interpretation');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Google reserves the right to amend or cancel this policy at its discretion. Any questions regarding interpretation should be referred to Cartus or Google Relocation Team.'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Policy Terms');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'The purpose of this policy is to define your relocation benefits. Google will provide relocation services and reimbursement of certain moving expenses incurred during your relocation as defined in this policy. Cartus will provide you with assistance in making arrangements to ensure that the relocation is managed in a cost effective manner, but also within a schedule that allows you effectiveness and flexibility. Receipts and documentation are required for reimbursement of all relocation-related expenses. Any Relocation under this policy must be approved by Google Relocation Team with the concurrence of the appropriate Google VP. Approval for exceptions should be coordinated through your Cartus IRC and Google Relocation Team (reloteam@google.com).'
        )
        .moveDown();
  
      doc
        .font('Arial-Bold')
        .fillColor('#4285F4')
        .text('Table of Relocation Benefits');
  
      doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(
          'Google is pleased to offer you the following benefits to assist you with your relocation. Extra expenses incurred outside the table and outside the time limit mentioned will not be reimbursed. Details about each benefit are described below.'
        )
        .moveDown();
  
      const table = new PdfTable(doc, {
        bottomMargin: 30
      });
  
      let columnWidth = 0;
  
      table
        // set defaults to your columns
        .setColumnsDefaults({
          headerHeight: 16,
          border: 'LTBR',
          align: 'center',
          valign: 'center',
          padding: [5],
          width: 256,
          height: 30
        })
        // add table columns
        .addColumns([
          {
            id: 'name',
            header: 'Benefits',
            headerRenderer: (tb: any, row: any) => {
              columnWidth = tb.columns[0].width;
  
              const x = tb.pos.x;
              const y = tb.pos.y;
  
              const bX = tb.pos.x + tb.columns[0].width;
              const bY = tb.pos.y + 20;
  
              tb.pdf.fillColor('#4285F4');
              tb.pdf
                .rect(x, y, tb.columns[0].width - 1, 22)
                .fill()
                .moveUp();
              tb.pdf
                .save()
                .moveTo(x, y)
                .lineTo(x, bY)
                .lineCap('square')
                .stroke()
                .restore();
              tb.pdf
                .save()
                .moveTo(x, y)
                .lineTo(bX, y)
                .lineCap('square')
                .stroke()
                .restore();
              tb.pdf
                .save()
                .moveTo(bX, y)
                .lineTo(bX, bY)
                .lineCap('square')
                .stroke()
                .restore();
  
              tb.pdf
                .fillColor('white')
                .font('Arial-Bold')
                .text(row.name, x, y + 5, { width: 256, align: 'center' })
                .moveUp();
            },
            cache: false,
            renderer: (tb: any, data: any, draw: any, column: any, pos: any) => {
              if (draw) {               
                tb.pdf
                  .font('Arial')
                  .fillColor('#4d4d4d')
                  .text(data.name, pos.x + 28, pos.y, {
                    height: 30,
                    width: 200,
                    align: 'center',
                    lineBreak: true
                  });
              }
  
              return '';
            }
          },
          {
            id: 'details',
            header: 'Details',
            headerRenderer: (tb: any, row: any) => {
              const x = tb.pos.x;
              const y = tb.pos.y;
  
              const bX = tb.pos.x + tb.columns[1].width + columnWidth;
              const bY = tb.pos.y + 20;
  
              tb.pdf.fillColor('#4285F4');
              tb.pdf
                .rect(x + columnWidth, y, tb.columns[1].width - 1, 22)
                .fill()
                .moveUp();
              tb.pdf
                .save()
                .moveTo(x, y)
                .lineTo(x, bY)
                .lineCap('square')
                .stroke()
                .restore();
              tb.pdf
                .save()
                .moveTo(x, y)
                .lineTo(bX, y)
                .lineCap('square')
                .stroke()
                .restore();
              tb.pdf
                .save()
                .moveTo(bX, y)
                .lineTo(bX, bY)
                .lineCap('square')
                .stroke()
                .restore();
  
              tb.pdf
                .fillColor('white')
                .font('Arial-Bold')
                .text(row.details, x + columnWidth, y + 5, { width: 256, align: 'center' })
                .moveUp();
            },
            cache: false,
            padding: [0],
            renderer: (tb: any, data: any, draw: any, column: any, pos: any) => {
              if (draw) {
                if (data.name === 'Education Complete') {
                  tb.pdf
                    .font('Arial')
                    .fillColor('#4d4d4d')
                    .text(data.details, pos.x + 10, pos.y, {
                      width: 225,
                      align: 'center',
                      lineBreak: true
                    });
                } else {
                  tb.pdf
                    .font('Arial')
                    .fillColor('#4d4d4d')
                    .text(data.details, pos.x + 28, pos.y, {
                      width: 200,
                      align: 'center',
                      lineBreak: true
                    });
                }
              }
  
              return '';
            }
          }
        ]);
  
      const tableBody: { name: String; details: any }[] = [];
      const SelectedBenefitIDs: string[] = [];
     
  
      SelectedBenefits.map((benefit: Benefit) => {
        SelectedBenefitIDs.push(benefit.BenefitID);
      });
  
      for (const key in benefitsTableDetails) {
      
        if (SelectedBenefitIDs.indexOf(key) !== -1) {
          
          if(key==='7373270A'){
  
            SelectedBenefits.map((benefit: Benefit) => {
              if(benefit.BenefitID===key)
              {
              let amtDetails = benefit.DestionationCtryCd;
              let langBenefit = benefitsTableDetails[key].details.split(" ");
              let foundCountry = getPunctuatedAmount(amtDetails);
              
              benefitsTableDetails[key].details = benefitsTableDetails[key].details.replace(langBenefit[2], foundCountry[1]);                     
              benefitsTableDetails[key].details = benefitsTableDetails[key].details.replace(langBenefit[3],foundCountry[2]);          
              (benefitsTableDetails[key].details);
            }
            });
  
           
          }
          tableBody.push(benefitsTableDetails[key]);
        }
        
      }
  
      table.addBody(tableBody);
  
      let hasHouseholdGoodsShipment = false;
      let hasHouseholdGoodsStorageTransit = false;
      let hasshippingReimbursement = false;
      let hasSelfOrganizedStorage = false;
      let hasTemporaryHousing = false;
      let hasCarRental = false;
      let hasLeaseTermination = false;
      let hasDuplicateHousing = false;
      let hasPreviewTrip = false;
      let hasBrokerFees = false;
      let hasDestinationServices = false;
      let hasEducationComplete = false;
      let hasEducationAssitance = false;
      let hasFinalTransportation = false;
      let hasLanguageTraining = false;
      let hasCulturalTraining = false;
      let hasLanguageLearningReimbursement = false;
  
      
  
      householdGoodsShipment.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) > -1 && !hasHouseholdGoodsShipment) {
          hasHouseholdGoodsShipment = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Household Goods Shipment', 50);
  
          //console.log(FamilyMoving, SpouseMoving, ParentMoving);
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `Your Relocation Consultant will organize a Hangout to discuss your shipment and information that the Freight Forwarder will need to know. After this, we will book in the service with one of Cartus’ designated Freight Forwarders. They will provide services covering the packing and transportation of all household and personal effects belonging to you ${
                FamilyMoving || SpouseMoving || ParentMoving ? 'and your family' : ''
              }, up to the limits stated in your Table of Relocation Benefits.`
            )
            .moveDown()
            .text(
              'The Freight Forwarder will explain your responsibilities, the required customs documentation for your move, and estimated transit times. The Freight Forwarder will contract with a local affiliate who will survey and pack your goods at the origin location, and a local party to deliver your goods at the destination location.'
            )
            .moveDown()
            .font('Arial-Bold-Italic')
            .fillColor('#000000')
            .text('Storage in Transit')
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'Sometimes your goods need to be stored during transportation, for example if you are awaiting immigration documents in your host country, or if you don’t have a permanent address to deliver the items to yet. Google cover the first 30 days of this type of storage as part of your Household Goods shipment. The Freight Forwarder will let you know if you are about to exceed this, and if you haven’t taken Additional Storage In Transit that covers this as part of your package, any costs of additional storage will be charged to you.'
            )
            .moveDown()
            .font('Arial-Bold-Italic')
            .fillColor('#000000')
            .text('Household Goods Shipment - Insurance')
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'Your goods will be insured for declared replacement value by Cartus’ insurance carrier, UNIRISC. The value of your shipment will be determined by the weight of your goods.'
            )
            .moveDown();
  
          let hasAirShipment = false;
          let hasSurfaceShipment = false;
  
          if (!hasAirShipment || !hasSurfaceShipment) {
            householdGoodsShipment.map((typeBenefitID: string) => {
              if (
                airShipment.indexOf(typeBenefitID) !== -1 &&
                !hasAirShipment &&
                SelectedBenefitIDs.indexOf(typeBenefitID) !== -1 &&
                !(HostCountry === 'India' && IntraRegionalFlg)
              ) {
                hasAirShipment = true;
  
                doc.text('Air Shipment = $24 per pound (lbs.)');
              }
  
              if (
                surfaceShipment.indexOf(typeBenefitID) !== -1 &&
                !hasSurfaceShipment &&
                SelectedBenefitIDs.indexOf(typeBenefitID) !== -1
              ) {
                hasSurfaceShipment = true;
  
                doc.text('Surface Shipment = $16 per pound (lbs.)').moveDown();
              }
            });
          }
  
          if (hasAirShipment || hasSurfaceShipment) {
            doc.moveDown();
          }
  
          doc
            .text(
              'In addition, we will ask you to fill out a “Valued Inventory Form” to outline items of high value (such as furniture worth over 10,000 USD and other items worth more than 2,500 USD). These values will be added to the total value determined by the estimated weight.'
            )
            .moveDown()
            .text(
              'You should let the movers pack your goods: all boxes packed by you will not be covered by insurance.'
            )
            .moveDown()
            .text(
              'Please note that stocks/bonds, jewelry, collections (stamp/coin/card etc.) loss of data/photos, wrinkled clothing irreplaceable personal items, plants or perishable food items are not covered by insurance.'
            )
            .moveDown()
            .text(
              'Google will not pay for shipment of items commonly disallowed by the carrier or other costs you may incur such as those below. This list is not complete, but represents some common articles not covered:'
            )
            .moveDown()
            .text('', 62)
            .list(householdGoodsBulletsOne, {
              bulletRadius: 1.5
            })
            .text('Other costs not covered:', 50)
            .text('', 62)
            .list(householdGoodsBulletsTwo, {
              bulletRadius: 1.5
            })
            .moveDown()
            .text(
              'Please note that if any goods not authorized by Google are put in your shipment, this could invalidate the insurance of the whole shipment.'
            );
        }
      });
  
      householdGoodsStorageTransit.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasHouseholdGoodsStorageTransit) {
          hasHouseholdGoodsStorageTransit = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Additional Household Goods Storage in Transit', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'In addition to the 30 days’ storage that Google includes as part of your shipment, you are entitled to the additional storage and insurance of household goods up to the duration indicated in the Table of Relocation Benefits, or through the date you obtain access to your new residence, whichever is shorter. If goods are put into storage under the circumstances above, Google will cover the transportation and delivery of those goods into the permanent residence once it becomes available. Removal of household goods from storage will be covered one time only.'
            );
        }
      });
  
      shippingReimbursement.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasshippingReimbursement) {
          hasshippingReimbursement = true;

          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Shipping Reimbursement', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'You will be reimbursed for the shipment of your household goods from your current primary residence up to the limit indicated in the Table of Relocation Benefits. If you do not use the entire amount you will forfeit the remaining balance - it will not be credited to you.'
            )
            .moveDown()
            .text(
              'Expenses such as the cost of packing, transportation, and standard insurance on transported articles of household goods are covered. This includes the costs of normal servicing of appliances. Other qualifying expenses include:'
            )
            .text('', 62)
            .list(shippingReimbursementBullets, {
              bulletRadius: 1.5
            });
            
            doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Pet Shipment Reimbursement', 50);

            doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text('You can claim for the costs associated with relocating your domesticated pets, from your current home location to your new address; up to the amount listed in your Table of Relocation Benefits. You may choose to do this by taking your domesticated pet(s) on your enroute journey in accordance with intra-country and airline guidelines, or by enlisting the support of specialists. Please note that you’ll be responsible for ensuring that your pet(s) are legally compliant to move to your new location, which may include organizing vaccinations, paperwork prior to relocation and related insurance fees. These costs can be reimbursed with proof of payment and is the requirement as part of the Shipment Reimbursement (inc. Pet Shipment) benefit.')
            .moveDown()
            .text('Please note your domesticated pet(s) may not be supported by your temporary housing provider, and temporary housing pet cleaning fees and temporary housing deposits will be out of scope expenses.');
        }
      });
  
      selfOrganizedStorage.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasSelfOrganizedStorage) {
          hasSelfOrganizedStorage = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Self-Organized Storage', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'You have opted for storage to accompany the shipment you have organized personally, up to the limit indicated in the Table of Relocation Benefits. Storage can be taken at your home or host location, and should be taken within 12 months of your relocation.'
            );
        }
      });
  
      temporaryHousing.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasTemporaryHousing) {
          hasTemporaryHousing = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Temporary Housing', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `Google will pay for temporary housing ${
                FamilyMoving || SpouseMoving || ParentMoving
                  ? 'for you and your eligible family members'
                  : ''
              } up to the duration indicated in the Table of Relocation Benefits.`
            )
            .moveDown(1)
            .text(
              `You may opt out of Google's temporary housing and instead receive a housing reimbursement for sourcing your own housing. Google or the Relocation Consultant can provide the reimbursement cap upon request, and rates are subject to location. If you are a current Googler, this cap may differ from the hotel caps listed in TRIPS, and TRIPS credits cannot be used nor earned for relocation related expenses.\n\nThe housing reimbursement will cover room charges or rent payments. If you move out of temporary housing or cancel your request for temporary housing and request housing reimbursement for any unused days, you are responsible for any fees, penalties, or payments associated with your leaving and/or your cancellation of the temporary housing. Google will deduct any such fees, penalties or payments from your total housing reimbursement. Before you give notice to move out of your temporary housing, please share your new housing details with your Relocation Consultant to calculate the reimbursement.\n\nYou can request reimbursement by submitting proof of payment to Cartus. A copy of the full rental contract will also be required if renting. Google will not reimburse any lodging purchased with credits, points, or rewards provided by any rewards programs, including but not limited to, credit card rewards, frequent flier programs, etc.\n\nIf you opt for temporary housing or a housing reimbursement, note additional charges, such as \nlong-distance phone calls, pet costs, parking, utilities, cleaning, ${
                !(IntraRegionalFlg && HostCountry === 'India') ? 'laundry, meals,' : ''
              } security deposits, lease signing fees, and other incidentals are not covered expenses.`
            )
            .moveDown(1)
            .text(
              'You agree that any unauthorized subletting or renting of temporary housing or any improper requests for the housing reimbursement, for example, “frontloading” the annual rent, may lead to disciplinary action.​'
            );
        }
      });
  
      carRental.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasCarRental) {
          hasCarRental = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Car Rental', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'You are entitled to reimbursement of mid-sized car rental costs up to the duration indicated in the Table of Relocation Benefits. Google will not cover upgrades, insurance (including but not limited to, liability, loss  damage waiver (LDW), collision damage waiver (CDW)), gas, GPS systems or other incidental expenses. You can request reimbursement by submitting receipts to Cartus.\n\nYou agree that any improper requests for car rental reimbursement may lead to disciplinary action.'
            );
        }
      });
  
      leaseTermination.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasLeaseTermination) {
          hasLeaseTermination = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Lease Termination', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'If a penalty of a number of months’ rent is assessed to cancel the lease of your present residence, you will be reimbursed for reasonable and actual expenses that you are legally liable for as defined in the lease, up to the number of months indicated in the Table of Relocation Benefits. You must provide a receipt from your landlord as well as a copy of the lease to Cartus to receive reimbursement.'
            );
        }
      });
  
      duplicateHousing.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasDuplicateHousing) {
          hasDuplicateHousing = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Duplicate Housing', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'If you are forced to pay mortgages on two homes due to vacating your current residence prior to its sale, you will be reimbursed the interest, taxes, and insurance portion of the lower cost obligation between the two residences, up to the number of months indicated in the Table of Relocation Benefits. If a purchase will not be made at destination, you will be reimbursed rent in the new destination or the interest, taxes and insurance portion of the departure residence, whichever is lesser, up to the number of months indicated in the Table of Relocation Benefits.\n\nOngoing maintenance issues, such as lawn care and snow removal, are not reimbursable. Google will not cover ongoing property fees such as HOA, Maintenance Payment Agreements or Co-op Housing Fees. You must provide documentation that indicates a detailed breakdown of your mortgage payment. Duplicate mortgage reimbursements are considered taxable income and will be subject to all applicable taxes, and will not be grossed-up by Google.'
            );
        }
      });
  
      if (SelectedBenefitIDs.indexOf('737399999') !== -1) {
        doc
          .moveDown()
          .font('Arial-Bold')
          .fillColor('#4285F4')
          .text('Miscellaneous Lump Sum', 50);
  
        doc
          .font('Arial')
          .fillColor('#4d4d4d')
          .text(
            'You will be paid a lump sum in local currency as specified in the Table of Relocation Benefits to assist with the miscellaneous costs incurred due to the relocation. This lump sum will be paid by Google in the first full payroll cycle. The lump sum should be used for incidental expenses including, but not limited to the following:'
          )
          .text('', 62)
          .list(miscellaneousLumpSumBullets)
          .moveDown()
          .text(
            'The lump sum is considered to be taxable income and will be subject to all applicable taxes and withholdings, and will not be grossed up by Google.'
          );
      }
  
      previewTrip.map((benefitID: string) => {
        const selectedBenefitIndex = SelectedBenefitIDs.indexOf(benefitID);
        if (selectedBenefitIndex !== -1 && !hasPreviewTrip) {
          hasPreviewTrip = true;
  
          if (benefitID === '7373080B' || benefitID === '7373080A' || benefitID === '7373081A') {
            doc
              .moveDown()
              .font('Arial-Bold')
              .fillColor('#4285F4')
              .text('Preview Trip', 50);
          } else {
            doc
              .moveDown()
              .font('Arial-Bold')
              .fillColor('#4285F4')
              .text('Preview Trip x 2', 50);
          }
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `To assist you in beginning your house hunting search and area orientation, you are entitled to one round trip visit ${
                FamilyMoving || SpouseMoving || ParentMoving
                  ? 'for you and your eligible family members'
                  : ''
              } to the destination location under a reimbursement plan.\n\nYou will be reimbursed economy class airfare, mid-sized car rental, plus reasonable lodging expenses (including meals), up to the duration indicated in the Table of Relocation Benefits. You should book your own  travel arrangements and apply for reimbursement through Cartus. Cartus can provide the reimbursement cap upon request. Reimbursement rates are subject to location.\n\nGoogle will not reimburse any lodging or flight or rail tickets purchased with credits, points, or rewards provided by any rewards programs, including but not limited to, credit card rewards, frequent flier programs, etc. If you are a current Googler, please book your travel in accordance with T&E policies, including the fare caps in TRIPS. Please note that TRIPS credits cannot be used nor earned for relocation related expenses.`
            );
        }
      });
  
      brokerFees.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasBrokerFees) {
          hasBrokerFees = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Broker Fees', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              'If a rental property is selected where a broker or finder’s fee is required, you will be reimbursed the fee up to the equivalent of three month’s rent. You will be responsible for any fee in excess of the amount covered by Google'
            );
        }
      });
  
      if (!hasDestinationServices) {
        hasDestinationServices = true;
  
        // 737337078 - total support 3 day
        // 737337077 - total support 2 day
        // 7373150A - total support with children
        // 7373160A - total support without children
        // 7373100A - home finding tour (1 Day)
        // 7373100C - home finding tour (3 Day)
        // 7373110A - settling in
  
        if (
          SelectedBenefitIDs.indexOf('7373160A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373150A') !== -1 ||
          SelectedBenefitIDs.indexOf('737337077') !== -1 ||
          SelectedBenefitIDs.indexOf('737337078') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100C') !== -1 ||
          SelectedBenefitIDs.indexOf('7373110A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100B') !== -1
        ) {
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Destination Services', 50)
            .font('Arial')
            .fillColor('#4d4d4d');
        }
  
        if (
          SelectedBenefitIDs.indexOf('7373150A') !== -1 ||
          SelectedBenefitIDs.indexOf('737337077') !== -1 ||
          SelectedBenefitIDs.indexOf('737337078') !== -1
        ) {
          doc
            .text(
              `Cartus’ local provider in ${HostCountry} will work with you to arrange homefinding service, settling in services and/or an area orientation which may include an overview of neighborhoods and housing, shopping, ${
                !NumChildren ? '' : 'schools,'
              } transportation systems, medical services, banking, etc.`
            )
            .moveDown();
        }
  
        if (
          SelectedBenefitIDs.indexOf('7373100A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100B') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100C') !== -1
        ) {
          doc
            .text(
              `Cartus’ local provider in ${HostCountry} will work with you to arrange homefinding services.`
            )
            .moveDown();
        }
  
        if (SelectedBenefitIDs.indexOf('7373110A') !== -1) {
          doc
            .text(
              `Cartus’ local provider in ${HostCountry} will work with you to arrange settling in services which may include an overview of neighborhoods and housing, shopping, transportation systems, medical services, banking, etc.`
            )
            .moveDown();
        }
  
        if (SelectedBenefitIDs.indexOf('7373160A') !== -1) {
          doc
            .text(
              `Cartus’ local provider in ${HostCountry} will work with you to arrange homefinding service, settling in services and/or an area orientation which may include an overview of neighborhoods and housing, shopping, transportation systems, medical services, banking, etc.`
            )
            .moveDown();
        }
  
        if (
          SelectedBenefitIDs.indexOf('7373160A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373150A') !== -1 ||
          SelectedBenefitIDs.indexOf('737337077') !== -1 ||
          SelectedBenefitIDs.indexOf('737337078') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100A') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100C') !== -1 ||
          SelectedBenefitIDs.indexOf('7373100B') !== -1
        ) {
          doc.text(
            'The home-finding service is designed to help you gain an understanding of the local rental market rates and practices. If you decide to use the home-finding service, a local agent will provide an itinerary of available properties based on your rental criteria, e.g., specified budget, location, etc. The local agent will be limited to housing availability in the area that you request, which may impact his or her ability to source options meeting all of your rental criteria.'
          );
        }
      }
  
      educationComplete.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasEducationComplete) {
          hasEducationComplete = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Education Complete', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `Cartus’ local provider in ${HostCountry} will support you in understanding the schools available locally for your ${
                NumChildren > 1 ? 'children' : ''
              } ${
                NumChildren === 1 ? 'child' : ''
              }. They will help you to understand the application process, and, where applicable, organize school visits.`
            );
        }
      });
  
      educationAssitance.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasEducationAssitance) {
          hasEducationAssitance = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Education Assistance', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `Bennett International Education Consultancy will reach out to you to discuss the specialized needs and support for your ${
                NumChildren > 1 ? 'children' : ''
              } ${NumChildren === 1 ? 'child' : ''} in your new location.`
            );
        }
      });
  
      finalTransportation.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasFinalTransportation) {
          hasFinalTransportation = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text(`Final Transportation to ${HostCountry}`, 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `Google will reimburse enroute expenses ${
                FamilyMoving || SpouseMoving || ParentMoving
                  ? 'for you and your eligible family members'
                  : ''
                } to move to your new residence. When travelling by plane, economy class should be booked. Ground transportation between your home location and departing airport, and between your host location airport and accommodation, is also covered (for example, the most direct economy class rail transport, airport shuttles, buses, subway trips and taxis). Food expenses will be reimbursed for enroute meals on the day of travel while traveling to your new host location, up to a cap of 75 USD/traveler. You should book your own travel and apply for reimbursement through Cartus.\n\nIf you are a current Googler, please note that TRIPS credits cannot be used nor earned for relocation related expenses. Final transportation expense reimbursements fall within Google travel policy guidelines. Google will not reimburse flights purchased with credits, points, or rewards including, but not limited, to frequent flier miles provided by any airlines, credit card companies, or other rewards programs. You may receive reimbursement for excess baggage fees. This amount is capped at $150/traveler.\n\nIf driving to final destination, mileage reimbursement will based off of traveling 350 miles/ 500 km per day along most direct route. You will also receive reimbursement for enroute meals and reasonable lodging expenses with daily forward progress. For example, Google will not reimburse lodging for more than one  night in one location.`
            );
        }
      });
  
      languageTraining.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasLanguageTraining) {
          hasLanguageTraining = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Language Training', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `To help facilitate your integration into ${HostCountry}, you ${
                SpouseMoving ? 'and your partner' : ''
              } will be provided with language training in your pre-departure location as indicated in the Table of Relocation Benefits.\n\nYour Cartus International Relocation Consultant will initiate this support and you will be contacted by our International Language Services team to organize this support.`
            );
        }
      });
  
      culturalTraining.map((benefitID: string) => {
        if (SelectedBenefitIDs.indexOf(benefitID) !== -1 && !hasCulturalTraining) {
          hasCulturalTraining = true;
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Cultural Training', 50);
  
          doc
            .font('Arial')
            .fillColor('#4d4d4d')
            .text(
              `To help facilitate your integration into ${HostCountry}, you will have access to cultural support as indicated in the Table of Relocation Benefits. Your Cartus International Relocation Consultant will initiate this support and you will be contacted by our Cross Cultural Training team to organize this support. The program will provide you with information on the country to which you are moving.`
            );
        }
      });
  
      if (
        SelectedBenefitIDs.indexOf('7373180A') !== -1 ||
        SelectedBenefitIDs.indexOf('7373180B') !== -1
      ) {
        doc
          .moveDown()
          .font('Arial-Bold')
          .fillColor('#4285F4')
          .text('Car Shipment', 50);
  
        doc
          .font('Arial')
          .fillColor('#4d4d4d')
          .text(
            'Cartus can arrange shipment of your automobile. Any automobiles shipped must be operable, registered and insured. Google’s policy does not cover antique, performance or show cars. Only the costs associated with the shipment itself are covered. Road taxes imposed by the central or state governments are not covered.'
          );
      }
  
      if (SelectedBenefitIDs.indexOf('7373260A') !== -1) {
        doc
          .moveDown()
          .font('Arial-Bold')
          .fillColor('#4285F4')
          .text('Career Transition Assistance', 50);
  
        doc
          .font('Arial')
          .fillColor('#4d4d4d')
          .text(
            'You have selected support to help maximize your partner’s career development opportunities in your new location. Please note that your partner’s ability to work in your new location may be subject to immigration restrictions, which is outside of REA’s control. You will be contacted by REA, who will personalize this service by performing a needs assessment. REA offer a range of resources and support within this benefit, such as help with preparing a resume, developing networking strategies, interview training, and coping strategies for adjusting to the new culture. Most of the support received will be telephone coaching and via access to online resources, but your partner can also benefit from up to two face to face meetings.'
          );
      }
  
      languageLearningReimbursement.map((benefitID:string)=>{
        if(SelectedBenefitIDs.indexOf(benefitID) > -1 && !hasLanguageLearningReimbursement)
        {
          hasLanguageLearningReimbursement=true;
  
          SelectedBenefits.map((benefit: Benefit) => {
            if(benefit.BenefitID==='7373270A')
            {
              let amtDetails = benefit.DestionationCtryCd;
              let rep = /{amount}/gi; 
              let foundCountry =getPunctuatedAmount(amtDetails);
              
              let firstLine= 'Google will reimburse local language learning expenses for you and each of your eligible family members, up to {amount} {currency} per eligible family member, within a year from your official start date. If the entire allowance is not used, the remaining balance will be forfeited and will not be credited to you. The language learning benefit cap is per eligible relocating individual and cannot be transferred between family members.';
              firstLine = firstLine.replace(rep, foundCountry[1]);          
              rep= /{currency}/gi; 
              firstLine = firstLine.replace(rep,foundCountry[2]);  
  
          doc
            .moveDown()
            .font('Arial-Bold')
            .fillColor('#4285F4')
            .text('Language Learning Reimbursement', 50);
  
            doc
        .font('Arial')
        .fillColor('#4d4d4d')
        .text(firstLine)
          .moveDown()
          .text('Qualifying expenses include language learning classes, language learning app/video subscriptions and learning materials (course books, activity books) required as part of the class curriculum. Language learning is to be self-organized with a provider of your choice.')
          .moveDown()
          .text('Note that expenses for courses other than language courses (including children’s playgroups), newspaper/magazine subscriptions, as well as movies and books and other incidentals are not covered expenses and will not be reimbursed under this benefit.')
          .moveDown()
          .text('Eligibility requirements and reimbursement process details will be communicated to you by your relocation consultant.');           
          }
        });
       
        } 
  
        
  
      });
    }
  
  }
 
}

const householdGoodsShipment = [
  '7373010B',
  '7373010C',
  '7373010D',
  '7373010E',
  '7373010F',
  '7373010G',
  '7373010H',
  '7373010I',
  '7373010J',
  '7373010K'
];
const householdGoodsStorageTransit = ['7373030A', '7373030B', '7373030C', '7373030D'];
const shippingReimbursement = ['7373010A', '7373011A'];
const selfOrganizedStorage = ['7373035A', '7373035B', '7373035C', '7373035D'];
const temporaryHousing = [
  '7373020A',
  '7373020B',
  '7373020C',
  '7373020D',
  '7373020E',
  '7373020F',
  '7373250A',
  '7373250B',
  '7373250C',
  '7373250D',
  '7373250E',
  '7373250F',
  '7373250G',
  '7373250H',
  '7373250I'
];
const languageLearningReimbursement = ['7373270A'];
const carRental = ['7373040A', '7373040B', '7373040C'];
const leaseTermination = ['7373050A', '7373050B', '7373050C'];
const duplicateHousing = ['7373060A', '7373060B', '7373060C'];
const previewTrip = ['7373080A', '7373080B', '7373085A', '7373085B', '7373081A', '7373086A'];
const brokerFees = ['7373090A', '7373090B'];
const educationComplete = ['7373140A'];
const educationAssitance = ['7373240A'];
const finalTransportation = ['7373170A'];
const airShipment = [
  '7373010B',
  '7373010C',
  '7373010D',
  '7373010E',
  '7373010F',
  '7373010G',
  '7373010J',
  '7373010K'
];
const surfaceShipment = [
  '7373010B',
  '7373010C',
  '7373010D',
  '7373010E',
  '7373010F',
  '7373010H',
  '7373010I'
];
const languageTraining = ['7373200A'];
const culturalTraining = ['7373170B', '7373210A'];

const householdGoodsBulletsOne = [
  'Any items or goods that are restricted by host local custom',
  'Horses, livestock, pets, cars, trailers, boats, snowmobiles, motorcycles, and hot tubs',
  'Boats, canoes and kayaks, over 14 ft.',
  'Boat/Utility trailers',
  'Snowmobiles/Jet Skis',
  'Large commercial shop machinery',
  'Playhouses, tool sheds, utility sheds',
  'Firewood, lumber, dirt, sand, rocks, glass, bricks or other building materials',
  'Perishables (including plants/ trees/ shrubs) or articles requiring refrigeration',
  'Large satellite television/radio discs or dishes',
  'Currency, passports or important papers/data contained on disc or tape such as accounts, bills, deeds, personal or professional papers, evidence of debt, and securities',
  'Food / Alcohol (including Wines)',
  'Goods delivered to or from self-storage facilities',
  'Grand Pianos (please note that Google will allow you to ship an upright piano with your goods but additional costs specific to it, such as crating, insurance and additional costs in moving it, will be charged to you; and if damage caused by the piano to other items would not be covered by insurance)',
  'Firearms, including antique guns',
  'Merchandise for sale / exhibition / private business'
];
const householdGoodsBulletsTwo = [
  'Laying or taking up carpeting',
  'Disassembling or assembling television antenna, draperies, home workshops, swings, pool tables, cable television hookups, etc.',
  'Electrical wiring, plumbing, venting of appliances',
  'Maid service, childcare, or house cleaning',
  'Debris removal',
  'Removal/installation of water, electrical or gas lines for appliances, lighting fixtures',
  'Removal/installation of basketball backboard and rim extensions',
  'Storage of vehicles',
  'Crating of pool table'
];
const shippingReimbursementBullets = [
  'Shipping/packing materials',
  'Insurance on shipments',
  'Excess baggage fees',
  'Import duties and taxes on shipping goods you already own'
];
const shippingCostSupported = [
  'Transportation Costs charged by the pet shipment provider',
  'Any public transport fees/upgrade costs for taking a pet onboard',
  'Carriers/equipment purchased for pet shipment',
  'Pet passports',
  'Kennels/Cattery costs'
];
const miscellaneousLumpSumBullets = [
  "Driver's license, license plates, and automobile registration fees",
  'Re-decoration and/or cleaning of old and new residences',
  'Seasonal clothing needed in the new location',
  'Tips/gratuities to movers',
  'Utility set up and cancellation fees',
  'Pet relocation costs'
];
const benefitsTableDetails: any = {  
  '7373010A': {
    name: 'Shipping Reimbursement (Inc. Pet Shipment)',
    details: 'up to 2,000 USD with supporting documentation'
  },
  '7373011A': {
    name: 'Shipping Reimbursement (Inc. Pet Shipment)',
    details: 'up to 4,000 USD with supporting documentation'
  },
  '7373010B': {
    name: 'Household Goods Shipment',
    details: 'Shipment of 2 bedroom home (6,000 lbs. = 26 cbm)'
  },
  '7373010C': {
    name: 'Household Goods Shipment',
    details: 'Shipment of 3 bedroom home (12,000 lbs. = 52 cbm)'
  },
  '7373010D': {
    name: 'Household Goods Shipment',
    details: 'Shipment of 4 bedroom home (16,000 lbs. = 70 cbm)'
  },
  '7373010E': {
    name: 'Household Goods Shipment',
    details: 'Shipment of 6 bedroom home (20,000 lbs. = 87 cbm)'
  },
  '7373010F': {
    name: 'Household Goods Shipment',
    details: 'Unlimited Shipment'
  },
  '7373010G': {
    name: 'Household Goods Shipment',
    details: 'Air Shipment of 500 lbs. (227 kg.)'
  },
  '7373010H': {
    name: 'Household Goods Shipment',
    details: 'Sea Shipment of 2 bedroom home (20 ft. container)'
  },
  '7373010I': {
    name: 'Household Goods Shipment',
    details: 'Sea Shipment of 4+ bedroom home (40 ft. container)'
  },
  '7373010J': {
    name: 'Household Goods Shipment',
    details: 'Air Shipment of 750 lbs. (340 kg.)'
  },
  '7373010K': {
    name: 'Household Goods Shipment',
    details: 'Air Shipment of 1000 lbs. (454 kg.)'
  },
  '7373030A': {
    name: 'Household Goods Storage in Transit',
    details: 'Additional 30 days'
  },
  '7373030B': {
    name: 'Household Goods Storage in Transit',
    details: 'Additional 60 days'
  },
  '7373030C': {
    name: 'Household Goods Storage in Transit',
    details: 'Additional 90 days'
  },
  '7373030D': {
    name: 'Household Goods Storage in Transit',
    details: 'Additional 150 days'
  },
  '7373035A': {
    name: 'Self Organized Storage',
    details: '30 days standalone'
  },
  '7373035C': {
    name: 'Self Organized Storage',
    details: '60 days standalone'
  },
  '7373035D': {
    name: 'Self Organized Storage',
    details: '90 days standalone'
  },
  '7373035B': {
    name: 'Self Organized Storage',
    details: '180 days standalone'
  },
  '7373020A': {
    name: 'Temporary Housing',
    details: '2 weeks'
  },
  '7373020B': {
    name: 'Temporary Housing',
    details: '30 days'
  },
  '7373020F': {
    name: 'Temporary Housing',
    details: '45 days'
  },
  '7373020C': {
    name: 'Temporary Housing',
    details: '60 days'
  },
  '7373020D': {
    name: 'Temporary Housing',
    details: '90 days'
  },
  '7373020E': {
    name: 'Temporary Housing',
    details: '180 days'
  },
  '7373250A': {
    name: 'Temporary Housing',
    details: '2 weeks (1 room)'
  },
  '7373250B': {
    name: 'Temporary Housing',
    details: '2 weeks (2 rooms)'
  },
  '7373250C': {
    name: 'Temporary Housing',
    details: '30 days (1 room)'
  },
  '7373250D': {
    name: 'Temporary Housing',
    details: '30 days (2 rooms)'
  },
  '7373250E': {
    name: 'Temporary Housing',
    details: '60 days (1 room)'
  },
  '7373250F': {
    name: 'Temporary Housing',
    details: '60 days (2 rooms)'
  },
  '7373250G': {
    name: 'Temporary Housing',
    details: '90 days (1 room)'
  },
  '7373250H': {
    name: 'Temporary Housing',
    details: '45 days (1 room)'
  },
  '7373250I': {
    name: 'Temporary Housing',
    details: '45 days (2 rooms)'
  },
  '7373040A': {
    name: 'Car Rental',
    details: '15 days'
  },
  '7373040B': {
    name: 'Car Rental',
    details: '30 days'
  },
  '7373040C': {
    name: 'Car Rental',
    details: '60 days'
  },
  '7373050A': {
    name: 'Lease Termination',
    details: '1 month'
  },
  '7373050B': {
    name: 'Lease Termination',
    details: '2 months'
  },
  '7373050C': {
    name: 'Lease Termination',
    details: '3 months'
  },
  '7373060A': {
    name: 'Duplicate Housing',
    details: '1 month'
  },
  '7373060B': {
    name: 'Duplicate Housing',
    details: '2 months'
  },
  '7373060C': {
    name: 'Duplicate Housing',
    details: '3 months'
  },
  '7373080A': {
    name: 'Preview Trip',
    details: '4 days, 3 nights'
  },
  '7373081A': {
    name: 'Preview Trip',
    details: '4 days, 3 nights'
  },
  '7373080B': {
    name: 'Preview Trip',
    details: '7 days, 6 nights'
  },
  '7373085A': {
    name: 'Preview Trip x 2',
    details: '4 days, 3 nights per trip'
  },
  '7373086A': {
    name: 'Preview Trip x 2',
    details: '4 days, 3 nights per trip'
  },
  '7373085B': {
    name: 'Preview Trip x 2',
    details: '7 days, 6 nights per trip'
  },
  '7373090A': {
    name: 'Broker Fees for New Apartment',
    details: "Actual fees (up to equivalent of three month's rent)"
  },
  '7373090B': {
    name: 'Broker Fees for New Apartment',
    details: "Actual fees (up to equivalent of three month's rent)"
  },
  '7373100A': {
    name: 'Destination Services',
    details: 'Home Finding Tour (1 day)'
  },
  '7373100B': {
    name: 'Destination Services',
    details: 'Home Finding Tour (2 day)'
  },
  '7373100C': {
    name: 'Destination Services',
    details: 'Home Finding Tour (3 day)'
  },
  '7373110A': {
    name: 'Destination Services',
    details: 'Settling in (1 day)'
  },
  '737337077': {
    name: 'Destination Services',
    details: 'Total Support (2 day)'
  },
  '737337078': {
    name: 'Destination Services',
    details: 'Total Support (3 day)'
  },
  '7373150A': {
    name: 'Destination Services',
    details: 'Total Support (with children)'
  },
  '7373160A': {
    name: 'Destination Services',
    details: 'Total Support (without children)'
  },
  '7373170A': {
    name: `Final Transportation to New Location`,
    details: 'Enroute expenses as detailed in the description below'
  },
  '7373200A': {
    name: 'Language Training',
    details: '20 hours'
  },
  '7373170B': {
    name: 'Cultural Training',
    details: 'Online access to Country Navigator'
  },
  '7373210A': {
    name: 'Cultural Training',
    details: '1/2 day program'
  },
  '7373180A': {
    name: 'Car Shipment',
    details: '1 Car OR 1 Two-wheeler'
  },
  '7373180B': {
    name: 'Car Shipment',
    details: '2 Cars OR 2 Two-wheelers'
  },
  '7373140A': {
    name: 'Education Complete',
    details: 'Destination Service Provider accompanied school visits and schooling information'
  },
  '7373240A': {
    name: 'Education Assistance',
    details: 'Bennett International organized school visits and schooling information'
  },
  '7373260A': {
    name: 'Career Transition Assistance',
    details: 'Support for your partner to find a new role in your new location'
  },
  '7373270A':{
    name:'Language Learning Reimbursement',
    details:'up to {amount} {currency} with supporting documentation'
  }
};

