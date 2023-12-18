import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts  from "pdfmake/build/vfs_fonts";
import { jsPDF } from "jspdf";

import { Alignment, Decoration, Margins } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class Product{
  name: string;
  price: number;
  qty: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  
  products: Product[] = [];
  additionalDetails: string;

  constructor(){
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-createInvoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
    invoice = new Invoice(); 
    customerData:any = {
      plan_price  :  "550",
      Plan_Name:  "test plan"
    }
    ngOnInit(): void {
      
    }

    addProduct(){
      this.invoice.products.push(new Product());
    }

    downProcess = false; clickedInvoice = 'x'; planAmount = 0;
    createPdf() {
      this.downProcess = true;
      this.clickedInvoice = "1";
      let customerData = "invoice";
      // let lastName = customerData.last_name
      // if(this.user.last_name == null){
      //   this.user.last_name = ''
      // }
      // if(this.user.company == null){
      //   this.user.company = ''
      // }
      try {
        if (customerData) {
         

          let doc = new jsPDF('p', 'mm', 'a4'); 
          var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAoCAYAAACYR+TJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzdCRUJCM0JGQjVEMTFFNzlCM0M5M0YzRDk5QTlFREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzdCRUJCM0NGQjVEMTFFNzlCM0M5M0YzRDk5QTlFREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDN0JFQkIzOUZCNUQxMUU3OUIzQzkzRjNEOTlBOUVEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDN0JFQkIzQUZCNUQxMUU3OUIzQzkzRjNEOTlBOUVEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu19oBoAABDjSURBVHja7F0JeFTVFT5vJplJMglJSMhGwk4gBBTZBBSwbEUU0aIFQRF3q1it62dRUWq1CFoqpVVAAdcquFvrgktZVDahbIJEQwgkIYQkkMxkkpnM9J7MeeTmzn3vTQKfZHn/9x0y8+7b3/3P+c+59w2Kf/os0EVVFRQnJ8GacaPAUuuDGJcLfBaLuNYyZvuYPaMucDqdkJGRAd26dQOPxwN+vx+aivgwP+RXW2D8nhhw1bBjhzV9XyZMnA1YDNeIioKkI4VwxZcbwK8w3tntoASTZiSzDPVLRUUFpKSkQI8ePcDr9Z4WyUyYaBtEQ5LERENqTi5c+u02cNttjHCKuFYNsx1IKIxkaWlp0KtXL6itra0zEyZMooWK2BjIyM2DjOISqIyM5FvisJWRbGMVk5lJSUmQlZUVYF9NDSjBpDRhwiSaJsLDkTnQLS8fnA25M4mRzO9yuQ506NAB+vTpUxfFqqurzxjJUHiGsV2ZnDXRUhEWem9n3d1qha6VLkhkn10eDzhsNvD5fDNYJNuGcjEzMxO/q5EsnW2VzSyNWSpFPi+z55gV6R0K+RRl9dd5gVp22DSbD7zsr99nPjATrZ1oCF8tOFhkG5CdDXv37YeyoiILC2Z9O3XqNJHlZMMYwS73eDwDGckS2doxzFy4FbMy5AwRzS6LWD72T/twPySF+8DjVyDfbYFqnwKOMD/scVnh4YNRUOVh1LOahRUTrZ1oDO5aL1jDbZCd3QcO2Wy3WSyWjl26dFnMSJbMSFbISLaFrfYts/8x+9lIEiLBkljESrb5YVelFdYcjYR1FWHwvTMMqhhF7YxYRTUW8DPiQYQZ0ky0HqJdw+whZpEUgSibs9ig0llsLz8x3WVRLO3skfMy0tOnWqzWl5hc/IyR7ANGsqpQcy4kWDIjWAqz3YxUz+bbYeXRCChj0StwZmwFxR9YGTWkSTITrYhoNzJb3jBhUgL52ZFCqE1J7pw7Y+pOu6Jszsk9OOpgTs6RpKSkG7P7ZoNS6WS09OpWLESC7WIEeyY/EpYXRUCFkxGMLYNIczjAROuD9bF+/dXPN0lJhuNgBYVQNuoC2PvA3eDIyw/vsXipNdddlXssof04f3n5CTsoEJWRAe5oByjeWrB4vfXbU5KGn7Co0TXSBz+7rbAgPwruzHHAuqN2wMkewJY3ogZqwkSLgkJTsG5mtjQ4BPnrSFY0ZTLkTZsC3ZetgsRP1gI4ogDi42oqY6K7+d3uIxjJlM6doHhAfzjZqye4k5PA6nJBeGk5KBYFOkX4Idzih20s93q3xAYvsghWyaIZ2BmJw0kemjDRyomGTFsR3MJi0KF8KBs32pdz3XRL34XPQeSOnQAZ6ZivAdR4oG5+lcUyHHy+LXCygi1XwJOWCmVZveDYyAvB1jUV0k8Uw3/LbbCsMALeYSSrC18oEU2CmWhjRGPJFUQ1WIpEKjme78zKnL/tiUdvHTB/0bro1e9eA0MGxILHK+5jA7MRp3I5pwugtAwgIRoKpk2DO5JHwXs51QAeJVDQsJjsMtH2gFmRM2hpZSV4k5MGHbh5VlG4x5NbmJU5u3DwgCXgkhYVlVMyE4GysktngJPFsOCbEnivsH1g7MtRa5LMRJsFVh1rgpZWuf3VvXsVO1NTYqILikbnXnn58+0S4sekPrsEIC42EPHq4Q7a3lkKxzP6waJBkxkBSwME8/+izuMPzAaQE3mV2TrzUTcbXMiMed+6oSPsfziZYX1bIFowYtspUQdyxnV+/+OVR0aPjE3du69T9/Xf5kF4eA+wGJUGGaO8bpjTcxxATBJAeT6Leae2SWCWorPxYWYnTvOanmT2IPcdCz04y3lfM38W+JpRO402HPP4WeoUWx7ehMC0PBVHDfpEKGDeH9J12nHK3/HmRzSbDRS3+6P0Ne/d2mHb9hdtZeUTlLLymXXRzOjdMmwPj4St7di989bwJEPcwOxpna2RZLuYvcHsH028pvGSZYNbANH+yewSnXbskJuYPc/sPy2YaMcFop0JAlzG7GWddif1q9XMnj1bOVowfDj3yW6DaMcKe25eheJyrWYkS4RQX+Bk68V73CDRi/4QPBNKC6ZR4dMmXtNKUQgz+7oFdECjqS/J1KE+ZjavBRPNa/C9KTDqVw5mQyHwCwDfYShpHkRTIxPKxHYxABERAGfmLenG3FSMTE814Rj4dkBnZlOZTYRARTW/BXTAxsjCR5iNNdO9BtI6VJwPsjHjsyIdf1mghznAbBDlUjzugcC8S/RAkyBQ4Qyj4kYBrTOM2a8g8FbAi9Rh8e2BHeRIsH0nyKqrgZ9gOIeiBXqSQghMhv5G41xHMTuX1q9mdoQS+R91ri8TcPgDoCNdRxld70YD2eSj6OUmpyPmb5iHrhWWhRMBs6ng4KTc7isweDWJYTgVkJKp4x6i7XIl6w6k68J7gJNTPyPZ7yAH14PZMWYf0bU2Ben0XLswY54eSpjtYfY5hFZa20HPEp9Xf6HtOupXhVzEw3V6Q+CVrgi67z/RtanP6Qp6hjV03fiM3pcQfQTJ4xrqr0pzINr9EBiLA+rgw/hskVk8XcgabvlC2g4l5u3c8k9Ieop5YC+BDL8h+ZWtcU55zGYQGdToisfsp7H+W1R0OcktwwfxCrOrdfIG3P+1zIo1ov8k+tyJOk0c155NjsTH5b+PaxQFkBAvMLtL0ob3+6/k6bWk+GzBUT3G7FLu+y3UIb8TChuYD/2O8spQodD6N2gEAnQcc5j9y2A/T9FzASK8mP92pvuO9YDRVKiToZLu60Ii6GShfRLtX0U0BFe585rD7MJE7vPnkvZ4CB5CuIjZ3wSSAZGp1kCyYqd5W4dk6kNQvdivKV/sp7P+b5ltJ0+o4t86JFO96HgdyaiQdwWKLgeF9ggiM+IBiuZalTeM9r+XFFFGkHM7X+c8Z1F04Cc1lArrzKXrT9Eo8gxtpMK5RUdtdSNyzDTYTzz3+SNJezRFxqt0SKaut4DZGAi82QISohkV4+Y0B6Id5j5fqVFtE5PXQdRxZBWtMI1Oi+jDbHEI54Rjb1iljCRpIOJTiVPADvAkfT6XCMrjA4oqW/kHwKxcJ8Ev5CJyb6EdpZoHAsMC8yXbf8hss7BsAkVqoGuTVS8raL88UAqu0incdBQ6tixvDgVI2CHCMnQy75Dk5rFKiPAieKl8jcb99VHEVYHPYouG3H2NottXwvKJBsTDYtxbzYFo6DHvJY/YR2g7SZKlvc72xymPyKPvUToVvYclbd+QZ8dc7W6Sscs4LS++EX45ddjxdO48rqe/CRrkvA0CQw3Y/kcIrpCKhap7SKZtEqIl0P0C2o/4YLtShfJ8koU8VBVwNUVVHu9QNEen8YPQdiURTgu7KXJNoA7JY7DBM1Rxn/B9HZ3PFNpeJMA0nX1NIamM8vwCSbvq8N6gauQgchZDKP98RVg/mRTEQ5Jc8jzOoV8qtOO4oac55Gh36LQtor+xGu23UfRxcjIqUcNLAyXX4vJRnLTcRZJUSwZ4ScaOJY9YIbTHETF3SM5hCUmiZfTZqKIaBtwP0krwJ41rKqUO05Mr2PDozslG2bMoI5vL5TgqJtM5yYoRs8khAEXue4X2AZLiDY9zSKbx+Ik6fhwVQ/Louvh9gsb5XEsmw/NQPzHiBBE8nO5lAu1P0ShsbaL+5hCi2HYidKLkWM2i6qiFDfSwQeOi36IHKpZ4LRqFB0WSQ6wD/SEHMeexUsFFD11Jdm6WyCCUlH8nqTefI0tjsYAerB0aDv6qMu77ECrNycLyEkFu7ZdsqxfR+J+t2CVpN5r9kSlZdj2nErTyXJmU1cNeoSg0l5RL1xC2TeAKRHyAuJiKaxMkRbVNWp3ybKOMOtIIQU/LpAroyERxmUUj/4MQOiXoEF4rCZ8gyZH4DjKPk6ihYj9VNx/gjhXZyH0kaFyLGJ3dkm0jDKSuClmBx2iQOLoJfSVFp3+IcJGS6M+d32ckzbuGeDz1OIsl0jiG/vJYrtWRzgZegkDpupqqhtugYZlcC1GNOIaiQcC0EG+sCsw9VtNNFaE+vALOYWCOdBOZrLJ3EzkV2TgcRujHSdqcoCi5SVIQqRLOB6uT6zUIWM3lT1ahrT00HC6I1lAGoUC2rdtgG9kz/5JycEXyXKqpQqkVMFaTKsLCTg4pgBJBBo8TtsFc/8+0LlaSH9ToD/upaDKYu5fzqGjFY4Ue0fK4UMhXAV9n9gSzL6C+7HwmsMRA6uiRJ1Q46EEfFSTTReThxYHji6kit4fLA1TcEMLx4qjj+MirLSdpdD+Ri8cwHaIZScsqqsplC2SYGcI5HhO+x1IxSlUKAzUiqhYmcFL+IgNpqSXpRKyF0GYHyYiGxYwPdbYZI1l2BTl9xHCDYy6iSqSKmwXnv57Pj7WkoxuCx6O8FH7PNLr8AlGzHZf3iVJoM+ntGZQ3YYf4mNpXSTz1Vsq9HGQoO6ZDYNxMrYKNJu+I0eoSckw/SipZerJHoXzLCOIYUTblr1kU1TDa9abCEQ5JqOOBr0r2tZzyyOEaJP9Ax8ktogjwGN0PEdsNrmOfRMrjcAkO4yRRPtoe6gfYXzZwtulN6CejiCw46eERg3XfFOS2QzifF/RyEERnDe8zM0RP2RyhOhSUBVOEtm5UoOCheqIvSHbwRYCBJOFOcJGAv/lqPtCJqln3GeSJG07z2p6WSJyryMqomhYtyEegiL1NiFwob3doHGcV1A+hgEb+9heNttXccfVwr8QBYBV4ISmEaKgfbvkBTu8tx52SZXisR0F/AJtXHFgUuVMjUK3RC7kLDOSBqptfaOLFyYhtbaI0CNdYVy/p3i7plDJ05I45VqNoEgvBww4RQjXM6BqWc07NLrm+UORxqYYMUosl0Tr3bQJJTyNsMZDMZQZ57l06BRX++2vQcHiFP+cE4R7ZDfqQUf3hTY28USXZRknBTXyGz4XqWCySg/fWkDhAcmIMeUKd7EmB8rCIUPOqpv7XFZZG5G6KEAGm6uSFKGFmc94yj2QYvh+nNYvDQxHia/qeA9pVUbVgMpd0/eneB9X5oWR8G4JndfDFhteh4bgaFgf6QqD6Ket0xZQjDQH9EvohKi4ckOR0GCULdZ6b+B0nDVxrIDV/hIYD8U3pVyj7Rmiotw9JPt5lsM8cTk7zCHo7AH+c57CQCzxInTGSqiqx5NG30s1eKnSQL6DBKxusf1aWwHVDb4GXsy4W37BOpJysGupn4ueEUGWM4Co6PvqOr74UaVQS0+gYFiLMPpCXnDH570mev5Juul5hJoakVirU/wxEEXUo2bn0oOtNpuv10nlvlhACJXsHqJ8RX0vn7Wkk6VKIPMl0/S7q6LsN7jMe+zyon71fQFU9GQGxmjZLoxNOpH0cBvnc1Z50Hz0UqSpAe4Z/b1o/jp5jKZF6t6T41J27VzbKkUN5qRTPezw905NUAONV3Tn0PPxEcLFOgT9/P1RIO9JDIRpQp1lKHrqQEn4shd4ukTgC0bAWVg4FcRnQceycwHtsXjeYaFWQEa0vddK2AgtFVXHO7cNUCwhJx6ZQUvhok04hKh7Sin+A63M3woq+lzEFf0j8SQMTrQ+eNnKdWF0dSeosQ6OgImVlzGkeOEaa/tocMD/nS7BWFtf9hogJE60EmSSxZSS7EYInVJ8iWsVpHrhAWmiKjIcOJTlwdd4mllHFmY+ndUE2yTusjVy71jQ0LBq9pLVRGCWCVzXxoFXaO1fqCDek4ii8ajH/T9xWhoNUaHBDfcGprSTiaymaRVOQwZkkK8Hgt0P/L8AAs/7FWUrx5V8AAAAASUVORK5CYII=';
          doc.addImage(imgData, 'JPEG', 20, 15, 75, 15);
  
  
          doc.setFont("helvetica");
          // doc.setFontType("bold");
          doc.setFontSize(20);
          doc.text('Tax Invoice',190, 25)
  
          doc.setFont("times");
          // doc.setFontType("normal");
          doc.setFontSize(13);
          doc.text(' Datium Insights', 105, 40, );
          doc.text(' Level 4, 1F Homebush Bay Drive, Rhodes, NSW 2138',105, 47,);
          doc.text(' A.B.N. 32 003 417 650', 105, 54, );
  
          doc.setFontSize(16);
          doc.setFont("helvetica");
          doc.setFont("bold");
          doc.text('To:', 20, 65, );
  
  
          doc.setFont("times");
          // doc.setFontType("normal");
          doc.setFontSize(13);
          doc.text("TireDoctorz",20, 73);
          doc.text("Mississauga", 20, 80, );
          // doc.text(20, 86, customerData.address ? this.commonService.capitalizeFirstLetter(customerData.address) : 'N/A');
          // doc.text(20, 92, customerData.city ? this.commonService.capitalizeFirstLetter(customerData.city) : 'N/A');
          // doc.text(20, 98, customerData.state ? this.commonService.capitalizeFirstLetter(customerData.state) : 'N/A');
          // doc.text(20, 104, customerData.pincode ? customerData.pincode : 'N/A');
  
  
          doc.text('Date:',160, 80);
          // doc.text(190, 80, this.datePipe.transform(invoice.created_at, 'dd-MM-yyyy'), null, null, 'right');
  
          doc.text('Invoice No:', 160, 86);
          doc.text(("5"), 190, 86 );
  
          doc.text('Start date:', 160, 92,);
          // doc.text(190, 92, this.datePipe.transform(invoice.sub_start_date, 'dd-MM-yyyy'), null, null, 'right');
  
          doc.text('End date:', 160, 98);
          // doc.text(190, 98, this.datePipe.transform(invoice.sub_end_date, 'dd-MM-yyyy'), null, null, 'right');
  
          // customerData.Plan_Name = this.commonService.capitalizeFirstLetter(customerData.Plan_Name);
          var strArr = doc.splitTextToSize(String("customerData.Plan_Name"), 35)
          var strLength = strArr.length;
          // console.log(strLength,'STR LENGTH');
          var add = 0;
          var leng = 0;
          if (strLength > 3) {
            add = 3 * strLength;
            leng = 3 * strLength;
          }
  
          doc.line(200, 110, 20, 110);
          doc.line(200, 120, 20, 120);
          doc.line(200, 140 + add, 20, 140 + add);
  
          doc.setFont("times");
          // doc.setFontType("bold");
          doc.text( 'Size', 50, 117,);
          doc.text( 'Price Per Item', 90, 117,);
          doc.text('Quantity',130, 117);
          doc.text('Total Price', 160, 117, );
  
          doc.setFont("times");
          // doc.setFontType("bold");
          doc.text('Plan Name', 20, 127, );
          doc.setFont("times");
          // doc.setFontType("normal");
          // doc.text(50, 127, strArr);
          let plan_price =55
          let origPlanAmount = (plan_price)
          // let cpPrice = parseFloat(customerData.coupon_price).toFixed(2);
          let originalGST : any = (origPlanAmount /110 * 10);
         
          let planAmountExGST : any = origPlanAmount - originalGST;
          planAmountExGST =  planAmountExGST.toFixed(2);
          originalGST = originalGST.toFixed(2);
          origPlanAmount = origPlanAmount;
          let totalAmount = (plan_price);
          totalAmount =  totalAmount;
    
          doc.text(('$' + planAmountExGST),95, 127, );
          doc.text(('$' + originalGST),130, 127, );
          doc.text(('$' + origPlanAmount),160, 127, ); 
  
          let couponName = '';
          let couponPriceIncGST: any = 0;
          let couponPriceGST: any = 0;
          let couponPriceExGST: any = 0;
          //console.log(customerData,'print the customer data here');
          // if (customerData.coupon_code != null && customerData.coupon_code != "") {
          //   couponPriceExGST  = planAmountExGST * (customerData.Discount_Percentage / 100);
          //   couponPriceExGST = couponPriceExGST.toFixed(2);
  
          //   couponName = `${customerData.coupon_code}`
  
          //   couponPriceIncGST = origPlanAmount * (customerData.Discount_Percentage / 100);
          //   couponPriceIncGST = couponPriceIncGST.toFixed(2);
  
          //   couponPriceGST = originalGST * (customerData.Discount_Percentage / 100);
          //   couponPriceGST = couponPriceGST.toFixed(2);
  
          //   doc.setFont("times");
          //   doc.setFontType("bold");
          //   doc.text(20, 137, 'Coupon Name');
  
          //   doc.setFont("times");
          //   doc.setFontType("normal");
          //   doc.text(50, 137, couponName);
          //   doc.text(92, 137 + add,('-'+' '+'$'+  couponPriceExGST));
          //   doc.text(127, 137 + add,('-'+' '+'$'+ couponPriceGST));
          //   doc.text(157, 137 + add,('-'+' '+'$'+ couponPriceIncGST));
          // }
         // console.log(totalAmount,'original price', couponPriceIncGST,'coupon price GST')
         let totalInvoice = (totalAmount - couponPriceIncGST).toFixed(2);
         let totalGst = (originalGST - couponPriceGST).toFixed(2);
         let totalPriceExGST = (planAmountExGST - couponPriceExGST).toFixed(2);
  
          doc.setFont("times");
          // doc.setFontType("bold");
          doc.text('Total', 20, 147 + add, );
          doc.text(('$' + totalPriceExGST), 95, 147 + add, );
          doc.text(('$' + totalGst), 130, 147 + add, );
          doc.text(('$' + totalInvoice), 160, 147 + add, );
  
          let pdfInvoice = `invoice-4.pdf`;
          doc.save('ppp-' + pdfInvoice)
          this.downProcess = false;
          this.clickedInvoice = "x";
        } else {
         alert("An error has been occured");
        }
        this.downProcess = false;
      } catch (e) {
        this.downProcess = false;
      }
      this.downProcess = false;
    }

    
  }