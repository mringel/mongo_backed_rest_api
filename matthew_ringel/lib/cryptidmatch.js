function intersect_safe(a, b)
{
  a.sort();
  b.sort();
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}


module.exports = function(cryptid1, cryptid2) {
  console.log("single: " + cryptid1.single + cryptid2.single);
  if (!(cryptid1.single === true && cryptid2.single === true)) return false;
  console.log("rabid: " + cryptid1.rabid + cryptid2.rabid)
  if (!(cryptid1.rabid === false && cryptid2.rabid === false)) return false;
  console.log(intersect_safe(cryptid1.hobbies, cryptid2.hobbies));
  if (intersect_safe(cryptid1.hobbies, cryptid2.hobbies).length === 0) return false;

  return true;

};
