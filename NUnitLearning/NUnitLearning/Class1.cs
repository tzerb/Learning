using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit;
using NUnit.Framework;

namespace NUnitLearning
{
    [TestFixture]
    public class Class1
    {
        [Test]
        public void Test1()
        {
            Assert.IsTrue(true);
        }

        [TestCase("tttt", "")]
        [TestCase("", "")]
        [TestCase("t3a4b5", "345")]
        [TestCase("3&amp;amp;5*", "35")]
        [TestCase("123", "123")]
        public void StripNonNumeric(string before, string expected)
        {
            // string actual = FormatUtils.StripNonNumeric(before);
            Assert.AreEqual(before, expected);
        }
    }
}
