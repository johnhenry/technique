/**
Return update function based on given instruction;
@param context:Object
@return Promise<*=>*>
*/
import instructionDictionary from './instruction-dictionary';
export default (instruction) => Promise.resolve(instructionDictionary[instruction.type](instruction.payload));
